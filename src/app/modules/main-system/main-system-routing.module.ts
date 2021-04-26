import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import {UserPageComponent} from '@module/main-system/pages/user-page/user-page.component';
import {RolePageComponent} from '@module/main-system/pages/role-page/role-page.component';

// Resolver
import {UserResolver} from '@module/main-system/service/user.resolver';
import {RoleResolver} from '@module/main-system/service/role.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user',
        resolve: { response: UserResolver },
        component: UserPageComponent,
        children: [
          {
            path: '',
            component: UserPageComponent
          }
        ]
      },
      {
        path: 'role',
        resolve: { response: RoleResolver },
        component: RolePageComponent,
        children: [
          {
            path: '',
            component: RolePageComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainSystemRoutingModule {}
