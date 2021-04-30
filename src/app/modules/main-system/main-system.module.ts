import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { MainSystemRoutingModule } from './main-system-routing.module';

// Pages
import {UserPageComponent} from './pages/user-page/user-page.component';
import {RolePageComponent} from './pages/role-page/role-page.component';

// Modals
import {AddRoleModalComponent} from './components/add-role-modal.component';
import {EditRoleModalComponent} from './components/edit-role-modal.component';
import {DeleteRoleModalComponent} from './components/delete-role-modal.component';
import {AddUserModalComponent} from './components/add-user-modal.component';
import {EditUserModalComponent} from './components/edit-user-modal.component';
import {DeleteUserModalComponent} from './components/delete-user-modal.component';

// Resolver
import {SystemService} from './service/system.service';
import {UserResolver} from './service/user.resolver';
import {RoleResolver} from './service/role.resolver';

import { SharedModule } from '@shared/shared.module';
import { CdsTagModule } from '@cds/angular';

const Pages = [UserPageComponent, RolePageComponent];
const Modals = [
  AddRoleModalComponent, EditRoleModalComponent, DeleteRoleModalComponent,
  AddUserModalComponent, EditUserModalComponent, DeleteUserModalComponent
];

const CdsModules = [
  CdsTagModule
];

@NgModule({
  declarations: [...Pages, ...Modals],
  imports: [
    CommonModule,
    MainSystemRoutingModule,
    SharedModule,
    ...CdsModules,
    FormsModule
  ],
  providers: [SystemService, UserResolver, RoleResolver]
})
export class MainSystemModule {}
