import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { MainComponent } from './main.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

// Resolver
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'system',
        loadChildren: () =>
          import('@module/main-system/main-system.module').then(m => m.MainSystemModule),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('@module/report/report.module').then(m => m.ReportModule),
      },
      {
        path: 'data',
        loadChildren: () =>
          import('@module/data/data.module').then(m => m.DataModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
