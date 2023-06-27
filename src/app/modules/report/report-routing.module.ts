import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import Aacsb31Component from '@here/pages/aacsb31/aacsb31.component';
import { Aacsb32Component } from '@here/pages/aacsb32/aacsb32.component';

// Resolver
import { aacsb31TableResolver, getAacsb32TableResolver, getAcademicYearResolver, getDepartmentResolver, getDisciplineResolver } from './services/report.resolver';
import { Aacsb81Component } from './pages/aacsb81/aacsb81.component';
import { AacsbTeacherProfileComponent } from './pages/aacsb-teacher-profile/aacsb-teacher-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'aacsb-3-1',
        resolve: { aacsb31Table: aacsb31TableResolver, disciplineList: getDisciplineResolver, academicYearList: getAcademicYearResolver },
        component: Aacsb31Component,
        children: [
          {
            path: '',
            component: Aacsb31Component
          }
        ]
      },
      {
        path: 'aacsb-3-2',
        resolve: { 
          bachelorTable: getAacsb32TableResolver('bachelor'), 
          masterTable: getAacsb32TableResolver('master'), 
          mbaTable: getAacsb32TableResolver('mba'),
          academicYearList: getAcademicYearResolver,
          departmentList: getDepartmentResolver,
        },
        component: Aacsb32Component,
        children: [
          {
            path: '',
            component: Aacsb32Component
          }
        ]
      },
      {
        path: 'aacsb-8-1',
        resolve: {
          disciplineList: getDisciplineResolver,
          academicYearList: getAcademicYearResolver,
        },
        component: Aacsb81Component,
        children: [
          {
            path: '',
            component: Aacsb81Component
          }
        ]
      },
      {
        path: 'aacsb-teacher-protofilo',
        resolve: {},
        component: AacsbTeacherProfileComponent,
        children: [
          {
            path: '',
            component: AacsbTeacherProfileComponent
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
export class ReportRoutingModule {}
