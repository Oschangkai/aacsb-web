import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportDataRoutingModule } from './report-data-routing.module';
import { SharedModule } from '@shared/shared.module';

// Pages
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

import { ReportDataService } from './services/report-data.service';
import { CollectCoursesModalComponent } from './components/collect-courses-modal/collect-courses-modal.component';

const Pages = [CourseComponent, TeacherComponent];
const Modals = [CollectCoursesModalComponent];

@NgModule({
  declarations: [...Pages, ...Modals],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportDataRoutingModule,
    SharedModule,
  ],
  providers: [ReportDataService]
})
export class ReportDataModule { }
