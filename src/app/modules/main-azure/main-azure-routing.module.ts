import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import {WebappInsightsPageComponent} from './pages/webapp-insights-page/webapp-insights-page.component';

// Resolver

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'webapps',
        component: WebappInsightsPageComponent,
        children: [
          {
            path: 'insights',
            component: WebappInsightsPageComponent
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
export class MainAzureRoutingModule {}
