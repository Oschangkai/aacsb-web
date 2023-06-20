import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

// Resolver
import { CourseResolver, DepartmentResolver, DisciplineResolver, QualificationResolver, TeacherResolver } from './services/report-data.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'course',
        resolve: { courses: CourseResolver, departments: DepartmentResolver, disciplines: DisciplineResolver },
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
        resolve: { teachers: TeacherResolver, departments: DepartmentResolver, qualifications: QualificationResolver },
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
export class ReportDataRoutingModule {}
