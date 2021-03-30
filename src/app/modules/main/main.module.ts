import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import {
  ClrDatagridModule,
  ClrDatalistModule,
  ClrDatepickerModule,
  ClrIconModule,
  ClrInputModule,
  ClrLoadingModule,
  ClrVerticalNavModule
} from '@clr/angular';
import { MainComponent } from './main.component';

// Components
import { AlertComponent } from './components/alert/alert.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SubnavComponent } from './components/subnav/subnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

// Pages
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FailureMailPageComponent } from './pages/failure-mail-page/failure-mail-page.component';

const Pages = [
  MainPageComponent, FailureMailPageComponent
];
const Components = [
  MainComponent, ToolbarComponent, FooterComponent, AlertComponent,
  SidenavComponent, SubnavComponent
];
const ClrModules = [
  ClrIconModule,
  ClrDatagridModule, ClrDatalistModule, ClrDatepickerModule,
  ClrInputModule, ClrLoadingModule, ClrVerticalNavModule
];

@NgModule({
  declarations: [...Pages, ...Components],
  imports: [CommonModule, ReactiveFormsModule, MainRoutingModule, ...ClrModules],
})
export class MainModule {}
