import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { MainComponent } from './main.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {FailureMailPageComponent} from './pages/failure-mail-page/failure-mail-page.component';

// Resolver
import {FailureMailResolver} from '@module/main/services/failure-mail.resolver';
import {AuthGuard} from '@core/guards/auth.guard';

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
        path: 'failure-mail',
        component: FailureMailPageComponent,
        resolve: { failureMailEvents: FailureMailResolver },
        children: [
          {
            path: '',
            component: FailureMailPageComponent
          }
        ]
      },
      {
        path: 'system',
        loadChildren: () =>
          import('@module/main-system/main-system.module').then(m => m.MainSystemModule),
      },
      {
        path: 'azure',
        loadChildren: () =>
          import('@module/main-azure/main-azure.module').then(m => m.MainAzureModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
