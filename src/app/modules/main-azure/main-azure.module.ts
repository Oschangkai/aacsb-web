import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainAzureRoutingModule } from './main-azure-routing.module';

// Pages
import { WebappInsightsPageComponent } from './pages/webapp-insights-page/webapp-insights-page.component';
import { VmPageComponent } from './pages/vm-page/vm-page.component';

// Components
import { WebappDetailCardComponent } from './components/webapp-detail-card.component';

// Modals

// Resolver
import { AzureService } from './services/azure.service';
import { WebappInsightsResolver } from './services/webapp-insights.resolver';
import { VmResolver } from './services/vm.resolver';

import { SharedModule } from '@shared/shared.module';

const Pages = [WebappInsightsPageComponent, VmPageComponent];
const Resolvers = [WebappInsightsResolver, VmResolver];
const Components = [WebappDetailCardComponent];

const CdsModules = [];

@NgModule({
  declarations: [...Pages, ...Components],
  imports: [
    CommonModule,
    MainAzureRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [AzureService, ...Resolvers]
})
export class MainAzureModule {}
