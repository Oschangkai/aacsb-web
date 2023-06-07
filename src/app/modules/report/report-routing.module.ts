import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { Aacsb31Component } from '@here/pages/aacsb31/aacsb31.component';
import { Aacsb32Component } from '@here/pages/aacsb32/aacsb32.component';

// Resolver
import {  } from '@here/services/report.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'aacsb-3-1',
        resolve: {  },
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
        resolve: {  },
        component: Aacsb32Component,
        children: [
          {
            path: '',
            component: Aacsb32Component
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
