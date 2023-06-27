import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDataUtilsRoutingModule } from './report-data-routing.module';

// Pages
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { CourseTeacherComponent } from './pages/course-teacher/course-teacher.component';

// Components
// Modal


const Pages = [CourseComponent, TeacherComponent, CourseTeacherComponent];


@NgModule({
  declarations: [...Pages],
  imports: [
    CommonModule,
    ReportDataUtilsRoutingModule
  ]
})
export class ReportDataUtilsModule { }
