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
      routerLink: 'report-data',
      shape: 'data-cluster',
      displayName: 'Report Data',
      permission: [...Permission.ReportData.ALL],
      child: [
        {
          routerLink: 'report-data/course',
          shape: 'book',
          displayName: 'Courses',
          permission: [...Permission.ReportData.ALL],
        },
        {
          routerLink: 'report-data/teacher',
          shape: 'assign-user',
          displayName: 'Teachers',
          permission: [...Permission.ReportData.ALL],
        },
      ]
    },
    {
      routerLink: 'report',
      shape: 'file-group',
      displayName: 'Reports',
      permission: [...Permission.Report.ALL],
      child: [
        {
          routerLink: 'report/aacsb-3-1',
          shape: 'table',
          displayName: 'AACSB 3.1',
          permission: [...Permission.Report.ALL]
        },
        {
          routerLink: 'report/aacsb-3-2',
          shape: 'table',
          displayName: 'AACSB 3.2',
          permission: [...Permission.Report.ALL]
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
