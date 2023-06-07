import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClarityIcons, loginIcon } from '@cds/core/icon';

import { LoginComponent } from './pages/login-page/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@shared/shared.module';

import '@cds/core/icon/register.js';
ClarityIcons.addIcons(loginIcon);

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
