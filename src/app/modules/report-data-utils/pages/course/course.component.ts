import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';

import { ReportDataUtilsService } from '@here/services/report-data-utils.service';
import { NullDisciplineCourseList } from '@model/response-data.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
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
  courses: NullDisciplineCourseList[] = [];
  academicYear = (new Date()).getFullYear() - 1912;
  academicYearList: number[] = [];

  load(): void {
    this.reportDataUtilsService.getNullDisciplineCourses({academicYear: this.academicYear.toString()})
      .subscribe(data => {
        this.courses = [ ...data ];
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ courses, academicYear }) => {
        this.courses = [...courses];
        this.academicYearList = [...academicYear];
        this.academicYear = this.academicYearList.sort((a, b) => b - a)[0];
      }
    );
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }

}
