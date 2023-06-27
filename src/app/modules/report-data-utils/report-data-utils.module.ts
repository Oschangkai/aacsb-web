import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityIcons, searchIcon } from '@cds/core/icon';

import '@cds/core/icon/register.js';
ClarityIcons.addIcons(searchIcon);

import { SharedModule } from '@shared/shared.module';
import { ReportDataUtilsRoutingModule } from './report-data-utils-routing.module';
import { ReportDataUtilsService } from './services/report-data-utils.service';

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
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ReportDataUtilsRoutingModule
  ],
  providers: [ReportDataUtilsService]
})
export class ReportDataUtilsModule { }
