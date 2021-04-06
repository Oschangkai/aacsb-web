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
  ClrLoadingModule, ClrModalModule, ClrSpinnerModule,
  ClrVerticalNavModule
} from '@clr/angular';
import { MainComponent } from './main.component';

// Components
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SubnavComponent } from './components/subnav/subnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

// Pages
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FailureMailPageComponent } from './pages/failure-mail-page/failure-mail-page.component';

// Resolver
import { FailureMailResolver } from '@module/main/services/failure-mail.resolver';
import { FailureMailService } from '@module/main/services/failure-mail.service';
import { SharedModule } from '@shared/shared.module';

const Pages = [
  MainPageComponent, FailureMailPageComponent
];
const Components = [
  MainComponent, ToolbarComponent, FooterComponent,
  SidenavComponent, SubnavComponent
];
const ClrModules = [
  ClrIconModule,
  ClrDatagridModule, ClrDatalistModule, ClrDatepickerModule,
  ClrInputModule, ClrLoadingModule, ClrVerticalNavModule,
  ClrModalModule, ClrSpinnerModule
];

@NgModule({
  declarations: [...Pages, ...Components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    ...ClrModules,
    SharedModule
  ],
  providers: [FailureMailService, FailureMailResolver]
})
export class MainModule {}
