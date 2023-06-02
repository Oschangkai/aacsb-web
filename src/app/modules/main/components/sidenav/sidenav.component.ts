import { Component, OnInit } from '@angular/core';
import { Permission } from '@model/ApplicationPermission.model';
import { SideMenu } from '@model/SideMenu.model';

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
        ...Permission.Users.ALL,
        ...Permission.Role.ALL
      ],
      child: [
        {
          routerLink: 'system/user',
          shape: 'user',
          displayName: 'User',
          permission: [...Permission.Users.ALL]
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
          permission: [...Permission.ALL]
        }
      ]
    },
    {
      routerLink: 'report',
      shape: 'envelope',
      displayName: 'Reports',
      permission: [...Permission.ALL]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
