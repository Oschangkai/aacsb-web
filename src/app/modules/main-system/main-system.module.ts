import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSystemRoutingModule } from './main-system-routing.module';
import {
  ClrDatagridModule,
  ClrDatalistModule,
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
    MainSystemRoutingModule,
    SharedModule,
    ...ClrModules,
    ...CdsModules
  ],
  providers: [SystemService, UserResolver, RoleResolver]
})
export class MainSystemModule {}
