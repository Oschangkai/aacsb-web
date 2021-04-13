import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login-page/login.component';
import {ClrInputModule, ClrPasswordModule, ClrSelectModule} from '@clr/angular';
import {LoginRoutingModule} from '@module/login/login-routing.module';

const clrModules = [ClrSelectModule, ClrInputModule, ClrPasswordModule];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ...clrModules
  ]
})
export class LoginModule { }
