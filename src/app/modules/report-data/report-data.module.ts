import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityIcons, searchIcon } from '@cds/core/icon';

import { ReportDataRoutingModule } from './report-data-routing.module';
import { ReportDataService } from './services/report-data.service';
import { SharedModule } from '@shared/shared.module';

import '@cds/core/icon/register.js';
ClarityIcons.addIcons(searchIcon);

// Pages
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

// Modals
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
