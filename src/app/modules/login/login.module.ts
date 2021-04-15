import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login-page/login.component';
import {ClrAlertModule, ClrInputModule, ClrPasswordModule, ClrSelectModule, ClrSpinnerModule} from '@clr/angular';
import {LoginRoutingModule} from '@module/login/login-routing.module';
import {SharedModule} from '@shared/shared.module';

const clrModules = [ClrSelectModule, ClrInputModule, ClrPasswordModule, ClrSpinnerModule, ClrAlertModule];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    ...clrModules
  ]
})
export class LoginModule { }
