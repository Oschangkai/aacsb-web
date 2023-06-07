import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';

// Pages
import { Aacsb31Component } from './pages/aacsb31/aacsb31.component';
import { Aacsb32Component } from './pages/aacsb32/aacsb32.component';

import { ReportService } from './services/report.service';

const Pages = [Aacsb31Component, Aacsb32Component];
const Modals = [];

@NgModule({
  declarations: [...Pages],
  imports: [
    CommonModule,
    ReportRoutingModule
  ],
  providers: [ReportService]
})
export class ReportModule { }
