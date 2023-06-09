import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDataRoutingModule } from './report-data-routing.module';
import { SharedModule } from '@shared/shared.module';

// Pages
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

import { ReportDataService } from './services/report-data.service';

const Pages = [CourseComponent, TeacherComponent];
const Modals = [];

@NgModule({
  declarations: [...Pages],
  imports: [
    CommonModule,
    ReportDataRoutingModule,
    SharedModule,
  ],
  providers: [ReportDataService]
})
export class ReportDataModule { }
