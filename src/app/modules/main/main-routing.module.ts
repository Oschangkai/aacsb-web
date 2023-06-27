import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { MainComponent } from './main.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

// Resolver
import { authGuard, pageGuard } from '@core/guards/core.guard';
import { Permission } from '@model/ApplicationPermission.model';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canMatch: [authGuard],
    children: [
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'system',
        canMatch: [pageGuard([...Permission.Users.ALL, ...Permission.Role.ALL])],
        loadChildren: () =>
          import('@module/main-system/main-system.module').then(m => m.MainSystemModule),
      },
      {
        path: 'report',
        canMatch: [pageGuard([...Permission.Report.ALL])],
        loadChildren: () =>
          import('@module/report/report.module').then(m => m.ReportModule),
      },
      {
        path: 'report-data',
        canMatch: [pageGuard([...Permission.ReportData.ALL])],
        loadChildren: () =>
          import('@module/report-data/report-data.module').then(m => m.ReportDataModule),
      },
      {
        path: 'report-data-utils',
        canMatch: [pageGuard([...Permission.ReportData.ALL])],
        loadChildren: () =>
          import('@module/report-data-utils/report-data-utils.module').then(m => m.ReportDataUtilsModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
