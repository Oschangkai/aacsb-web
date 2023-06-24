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

// Components
import { SemesterDgFilterComponent } from './components/semester-dg-filter/semester-dg-filter.component';
import { DepartmentDgFilterComponent } from './components/department-dg-filter/department-dg-filter.component';

// Modals
import { CollectCoursesModalComponent } from './components/collect-courses-modal/collect-courses-modal.component';
import { EditTeacherModalComponent } from './components/edit-teacher-modal/edit-teacher-modal.component';

const Pages = [CourseComponent, TeacherComponent];
const Components = [SemesterDgFilterComponent, DepartmentDgFilterComponent];
const Modals = [CollectCoursesModalComponent, EditTeacherModalComponent];

@NgModule({
  declarations: [...Pages, ...Modals, ...Components],
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
