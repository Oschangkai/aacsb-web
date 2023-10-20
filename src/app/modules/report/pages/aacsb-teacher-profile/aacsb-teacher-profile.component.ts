import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgProgress } from 'ngx-progressbar';

import { Packer } from "docx";
import { saveAs } from "file-saver";

import { ReportService } from '@here/services/report.service';
import { EnvironmentService } from '@service/environment.service';

import { teacherResumeTemplate } from '@here/services/teacher-profile-template';
import { TeacherResume } from '@model/response-data.model';

@Component({
  selector: 'app-aacsb-teacher-profile',
  templateUrl: './aacsb-teacher-profile.component.html',
  styleUrls: ['./aacsb-teacher-profile.component.scss']
})
export class AacsbTeacherProfileComponent {

   constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    protected env: EnvironmentService,
    private ngProgress: NgProgress
) {
  this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
    this.loadData = state.active;
  });
}

  private httpStateSubscription: Subscription;
  
  // states
  loadData = true;
  debug = !this.env.production;
  academicYear = (new Date()).getFullYear() - 1912;
  academicYearList: number[] = [];
  selectedTeacher: string|null = null;

  // data
  teacherResume: TeacherResume[] = [];

  async generateDocuments() {
    const blob = await Packer.toBlob(teacherResumeTemplate(this.teacherResume, this.debug));
    const docblob = blob.slice(0, blob.size, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    saveAs(docblob, `${(new Date()).getFullYear() - 1912}-resumes-${Math.round((new Date()).getTime() / 100000)}${this.debug ? '-debug' : ''}.docx`);
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ teacherResume }) => {
        this.teacherResume = [...teacherResume]
          .sort((a, b) => a.englishName.localeCompare(b.englishName))
          .sort((a, b) => a.department.localeCompare(b.department, "zh-TW"));
      }
    );
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }

}
