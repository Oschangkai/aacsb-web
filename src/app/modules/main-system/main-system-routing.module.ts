import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { UserPageComponent } from '@module/main-system/pages/user-page/user-page.component';
import { RolePageComponent } from '@module/main-system/pages/role-page/role-page.component';
import { AuditLogPageComponent } from '@module/main-system/pages/audit-log-page/audit-log-page.component';

// Resolver
import { UserResolver } from '@module/main-system/service/user.resolver';
import { RoleResolver } from '@module/main-system/service/role.resolver';
import { AuditLogResolver } from '@module/main-system/service/auditLog.resolver';

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
      },
      {
        path: 'log',
        resolve: { response: AuditLogResolver },
        component: AuditLogPageComponent,
        children: [
          {
            path: '',
            component: AuditLogPageComponent
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
