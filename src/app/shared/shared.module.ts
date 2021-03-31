import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAlertComponent } from '@component/app-alert/app-alert.component';
import { StandardAlertComponent } from '@component/standard-alert/standard-alert.component';
import {ClrAlertModule, ClrIconModule} from '@clr/angular';

const ClrModules = [ClrAlertModule, ClrIconModule];

@NgModule({
  declarations: [AppAlertComponent, StandardAlertComponent],
  imports: [CommonModule, ...ClrModules],
  exports: [
    AppAlertComponent,
    StandardAlertComponent
  ]
})
export class SharedModule {}
