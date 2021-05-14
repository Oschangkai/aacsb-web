import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

// Components
import { AppAlertComponent } from '@component/app-alert/app-alert.component';
import { StandardAlertComponent } from '@component/standard-alert/standard-alert.component';

// Directive
import { PermissionDirective } from '@shared/directives/permission.directive';
import { LazyForDirective } from '@shared/directives/lazy-for.directive';

const ClrModules = [ClarityModule];
const Directives = [PermissionDirective, LazyForDirective];

@NgModule({
  declarations: [AppAlertComponent, StandardAlertComponent, ...Directives],
  imports: [CommonModule, ...ClrModules],
  exports: [
    AppAlertComponent,
    StandardAlertComponent,
    ...Directives,
    ...ClrModules
  ]
})
export class SharedModule {}
