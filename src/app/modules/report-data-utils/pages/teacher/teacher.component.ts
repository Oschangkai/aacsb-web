import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissingDataTeacherList } from '@model/response-data.model';
import { ReportDataUtilsService } from '@module/report-data-utils/services/report-data-utils.service';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
constructor(
    private route: ActivatedRoute,
    private reportDataUtilsService: ReportDataUtilsService,
    private ngProgress: NgProgress
  ) {
    this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
      this.loadData = state.active;
    });
  }
  private httpStateSubscription: Subscription;

  // states
  loadData = true;

  // data
  teachers: MissingDataTeacherList[] = [];
  column: 'degree' | 'responsibility' | 'qualification' | 'workType' = 'degree';
  academicYear = (new Date()).getFullYear() - 1912;
  academicYearList: number[] = [];

  load(): void {
    this.reportDataUtilsService.getMissingDataTeachers({academicYear: this.academicYear.toString(), column: this.column})
      .subscribe(data => {
        this.teachers = [ ...data ];
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ teachers, academicYear }) => {
        this.teachers = [...teachers];
        this.academicYearList = [...academicYear];
        this.academicYear = this.academicYearList.sort((a, b) => b - a)[0];
      }
    );
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }

}

