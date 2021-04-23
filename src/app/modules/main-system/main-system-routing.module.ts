import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import {UserPageComponent} from '@module/main-system/pages/user-page/user-page.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {RolePageComponent} from '@module/main-system/pages/role-page/role-page.component';

// Resolver

const routes: Routes = [
  {
    path: '',
    children:
    [
      {
        path: 'user',
        component: UserPageComponent
      },
      {
        path: 'role',
        component: RolePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainSystemRoutingModule {}
