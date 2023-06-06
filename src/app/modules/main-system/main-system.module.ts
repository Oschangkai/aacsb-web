import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityIcons, plusIcon } from '@cds/core/icon';

import { MainSystemRoutingModule } from './main-system-routing.module';

// Pages
import { UserPageComponent } from './pages/user-page/user-page.component';
import { RolePageComponent } from './pages/role-page/role-page.component';
import { AuditLogPageComponent } from './pages/audit-log-page/audit-log-page.component';

// Modals
import { AddRoleModalComponent } from './components/add-role-modal.component';
import { EditRoleModalComponent } from './components/edit-role-modal.component';
import { DeleteRoleModalComponent } from './components/delete-role-modal.component';
import { AddUserModalComponent } from './components/add-user-modal.component';
import { EditUserModalComponent } from './components/edit-user-modal.component';
import { DeleteUserModalComponent } from './components/delete-user-modal.component';

import { SystemService } from './service/system.service';
import { SharedModule } from '@shared/shared.module';
import { CdsTagModule } from '@cds/angular';

import '@cds/core/icon/register.js';
ClarityIcons.addIcons(plusIcon);

const Pages = [UserPageComponent, RolePageComponent, AuditLogPageComponent];
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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SystemService]
})
export class MainSystemModule {}
