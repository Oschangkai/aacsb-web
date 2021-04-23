import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainSystemRoutingModule } from './main-system-routing.module';
import {
  ClrDatagridModule,
  ClrDatalistModule,
  ClrIconModule,
  ClrInputModule,
  ClrLoadingModule, ClrModalModule
} from '@clr/angular';

// Pages
import {UserPageComponent} from '@module/main-system/pages/user-page/user-page.component';
import {RolePageComponent} from '@module/main-system/pages/role-page/role-page.component';

// Resolver

import { SharedModule } from '@shared/shared.module';
import {AuthGuard} from '@core/guards/auth.guard';

const Pages = [UserPageComponent, RolePageComponent];

const ClrModules = [
  ClrIconModule,
  ClrDatagridModule, ClrDatalistModule,
  ClrInputModule, ClrLoadingModule,
  ClrModalModule
];

@NgModule({
  declarations: [...Pages],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainSystemRoutingModule,
    ...ClrModules,
    SharedModule
  ],
  providers: [AuthGuard]
})
export class MainSystemModule {}
