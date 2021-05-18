import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { WebappInsightsPageComponent } from './pages/webapp-insights-page/webapp-insights-page.component';
import { WebappInsightsResolver } from './services/webapp-insights.resolver';

// Resolver

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'webapps',
        component: WebappInsightsPageComponent,
        resolve: { response: WebappInsightsResolver },
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
