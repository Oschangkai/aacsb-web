import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NullDisciplineCourseList, SimpleA31TeacherList } from '@model/response-data.model';
import { ReportDataUtilsService } from '@module/report-data-utils/services/report-data-utils.service';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-teacher',
  templateUrl: './course-teacher.component.html',
  styleUrls: ['./course-teacher.component.scss']
})
export class CourseTeacherComponent {
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
  teachers: SimpleA31TeacherList[] = [];
  teacher: string = '';
  academicYear = (new Date()).getFullYear() - 1912;
  academicYearList: number[] = [];

  loadTeachers(): void {
    this.reportDataUtilsService.getSimpleA31TeacherList({academicYear: this.academicYear.toString()})
        .subscribe(teachers => {
          this.teachers = [...teachers];
          this.teachers.sort((a, b) => a.teacher.localeCompare(b.teacher));
          this.teacher = this.teachers[0].teacher;
          this.load();
        });
  }
  load(): void {
    this.reportDataUtilsService.getA31CourseByTeacher({academicYear: this.academicYear.toString(), teacherName: this.teacher})
      .subscribe(courses => {
        this.courses = [...courses];
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ academicYear }) => {
        this.academicYearList = [...academicYear];
        this.academicYear = this.academicYearList.sort((a, b) => b - a)[0];
        this.reportDataUtilsService.getSimpleA31TeacherList({academicYear: this.academicYear.toString()})
          .subscribe(teachers => {
            this.teachers = [...teachers];
            this.teachers.sort((a, b) => a.teacher.localeCompare(b.teacher));
            this.teacher = this.teachers[0].teacher;
            this.load();
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }

}
