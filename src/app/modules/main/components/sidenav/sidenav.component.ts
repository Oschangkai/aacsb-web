import { Component, OnInit } from '@angular/core';
import { Permission } from '@model/ApplicationPermission.model';
import {SideMenu} from '@model/SideMenu.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  sideMenu: SideMenu[] = [
    {
      routerLink: '',
      shape: 'home',
      displayName: 'Home',
      permission: [Permission.ALL]
    },
    {
      routerLink: 'system',
      shape: 'cog',
      displayName: 'System',
      permission: [
        ...Permission.User.ALL,
        ...Permission.Role.ALL
      ],
      child: [
        {
          routerLink: 'system/user',
          shape: 'user',
          displayName: 'User',
          permission: [...Permission.User.ALL]
        },
        {
          routerLink: 'system/role',
          shape: 'users',
          displayName: 'Group',
          permission: [...Permission.Role.ALL]
        },
        {
          routerLink: 'system/log',
          shape: 'list',
          displayName: 'Audit Logs',
          permission: [...Permission.AuditLog.ALL]
        }
      ]
    },
    {
      routerLink: 'failure-mail',
      shape: 'envelope',
      displayName: 'Failure Mails',
      permission: [...Permission.SendGrid.FailureMail.ALL]
    },
    {
      routerLink: 'azure/webapps',
      shape: 'world',
      displayName: 'WebApp Insights',
      permission: [...Permission.Azure.WebApps.ALL]
    },
    {
      routerLink: 'azure/vm',
      shape: 'vm',
      displayName: 'Virtual Machine',
      permission: [...Permission.Azure.VM.ALL]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
