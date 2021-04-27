import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainSystemRoutingModule } from './main-system-routing.module';
import {
  ClarityModule,
  ClrDatagridModule,
  ClrDatalistModule,
  ClrIconModule,
  ClrInputModule,
  ClrLoadingModule, ClrModalModule
} from '@clr/angular';

// Pages
import {UserPageComponent} from './pages/user-page/user-page.component';
import {RolePageComponent} from './pages/role-page/role-page.component';

// Resolver
import {SystemService} from './service/system.service';
import {UserResolver} from './service/user.resolver';
import {RoleResolver} from './service/role.resolver';

import { SharedModule } from '@shared/shared.module';
import { CdsTagModule } from '@cds/angular';

const Pages = [UserPageComponent, RolePageComponent];

const ClrModules = [
  ClarityModule, ClrIconModule,
  ClrDatagridModule, ClrDatalistModule,
  ClrInputModule, ClrLoadingModule,
  ClrModalModule
];
const CdsModules = [
  CdsTagModule
];

@NgModule({
  declarations: [...Pages],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainSystemRoutingModule,
    SharedModule,
    ...ClrModules,
    ...CdsModules
  ],
  providers: [SystemService, UserResolver, RoleResolver]
})
export class MainSystemModule {}
