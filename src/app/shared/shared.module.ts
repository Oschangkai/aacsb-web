import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

// Components
import { AppAlertComponent } from '@component/app-alert/app-alert.component';
import { StandardAlertComponent } from '@component/standard-alert/standard-alert.component';

// Directive
import {PermissionDirective} from '@shared/directives/permission.directive';

const ClrModules = [ClarityModule];

@NgModule({
  declarations: [AppAlertComponent, StandardAlertComponent, PermissionDirective],
  imports: [CommonModule, ...ClrModules],
  exports: [
    AppAlertComponent,
    StandardAlertComponent,
    PermissionDirective,
    ...ClrModules
  ]
})
export class SharedModule {}
