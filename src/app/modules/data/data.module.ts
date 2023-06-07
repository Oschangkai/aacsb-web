import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';

// Pages
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

import { DataService } from './services/data.service';

const Pages = [CourseComponent, TeacherComponent];
const Modals = [];

@NgModule({
  declarations: [...Pages],
  imports: [
    CommonModule,
    DataRoutingModule
  ],
  providers: [DataService]
})
export class DataModule { }
