import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { WebappInsightsPageComponent } from './pages/webapp-insights-page/webapp-insights-page.component';
import { VmPageComponent } from '@module/main-azure/pages/vm-page/vm-page.component';

// Resolver
import { WebappInsightsResolver } from './services/webapp-insights.resolver';
import { VmResolver } from '@module/main-azure/services/vm.resolver';

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
            path: '',
            component: WebappInsightsPageComponent
          }
        ]
      },
      {
        path: 'vm',
        component: VmPageComponent,
        resolve: { response: VmResolver },
        children: [
          {
            path: '',
            component: VmPageComponent
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
