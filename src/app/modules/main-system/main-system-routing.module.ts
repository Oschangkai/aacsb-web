import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { UserPageComponent } from '@module/main-system/pages/user-page/user-page.component';
import { RolePageComponent } from '@module/main-system/pages/role-page/role-page.component';
import { AuditLogPageComponent } from '@module/main-system/pages/audit-log-page/audit-log-page.component';

// Resolver
import { auditLogResolver, roleResolver, userResolver } from '@service/main-system.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user',
        resolve: { response: userResolver },
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
        resolve: { response: roleResolver },
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
        resolve: { response: auditLogResolver },
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
