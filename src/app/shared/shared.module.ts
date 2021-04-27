import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClarityModule, ClrAlertModule, ClrIconModule} from '@clr/angular';

// Components
import { AppAlertComponent } from '@component/app-alert/app-alert.component';
import { StandardAlertComponent } from '@component/standard-alert/standard-alert.component';

// Directive
import {PermissionDirective} from '@shared/directives/permission.directive';

const ClrModules = [ClarityModule, ClrAlertModule, ClrIconModule];

@NgModule({
  declarations: [AppAlertComponent, StandardAlertComponent, PermissionDirective],
  imports: [CommonModule, ...ClrModules],
  exports: [
    AppAlertComponent,
    StandardAlertComponent,
    PermissionDirective
  ]
})
export class SharedModule {}
