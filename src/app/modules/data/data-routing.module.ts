import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

// Resolver
import {  } from './services/data.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'course',
        resolve: {  },
        component: CourseComponent,
        children: [
          {
            path: '',
            component: CourseComponent
          }
        ]
      },
      {
        path: 'teacher',
        resolve: {  },
        component: TeacherComponent,
        children: [
          {
            path: '',
            component: TeacherComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule {}
