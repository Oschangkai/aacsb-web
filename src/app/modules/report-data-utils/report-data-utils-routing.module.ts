import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { CourseTeacherComponent } from './pages/course-teacher/course-teacher.component';

// Resolver
import { getAcademicYearResolver, getMissingDataTeachersResolver, getNullDisciplineCoursesResolver } from './services/report-data-utils.resolver';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'course',
        resolve: { courses: getNullDisciplineCoursesResolver, academicYear: getAcademicYearResolver },
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
        resolve: { teachers: getMissingDataTeachersResolver, academicYear: getAcademicYearResolver },
        component: TeacherComponent,
        children: [
          {
            path: '',
            component: TeacherComponent
          }
        ]
      },
      {
        path: 'course-teacher',
        resolve: { academicYear: getAcademicYearResolver },
        component: CourseTeacherComponent,
        children: [
          {
            path: '',
            component: CourseTeacherComponent
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
export class ReportDataUtilsRoutingModule {}
