import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { MainAzureRoutingModule } from './main-azure-routing.module';

// Pages
import {WebappInsightsPageComponent} from './pages/webapp-insights-page/webapp-insights-page.component';

// Modals

// Resolver

import { SharedModule } from '@shared/shared.module';

const Pages = [WebappInsightsPageComponent];
const Modals = [];

const CdsModules = [];

@NgModule({
  declarations: [...Pages],
  imports: [
    CommonModule,
    MainAzureRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: []
})
export class MainAzureModule {}
