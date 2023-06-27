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
          shape: 'administrator',
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
          shape: 'calendar',
          displayName: 'Courses',
          permission: [...Permission.ReportData.ALL],
        },
        {
          routerLink: 'report-data/teacher',
          shape: 'user',
          displayName: 'Teachers',
          permission: [...Permission.ReportData.ALL],
        },
        {
          routerLink: 'report-data/research',
          shape: 'library',
          displayName: 'Research',
          permission: [...Permission.ReportData.ALL],
        }
      ]
    },
    {
      routerLink: 'report-data-utils',
      shape: 'wrench',
      displayName: 'Data Utilities',
      permission: [...Permission.ReportData.ALL],
      child: [
        {
          routerLink: 'report-data-utils/course',
          shape: 'calendar',
          displayName: 'Courses',
          permission: [...Permission.ReportData.ALL],
        },
        {
          routerLink: 'report-data-utils/teacher',
          shape: 'user',
          displayName: 'Teachers',
          permission: [...Permission.ReportData.ALL],
        },
        {
          routerLink: 'report-data-utils/course-teacher',
          shape: 'book',
          displayName: 'Teacher Courses',
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
        },
        {
          routerLink: 'report/aacsb-8-1',
          shape: 'table',
          displayName: 'AACSB 8.1',
          permission: [...Permission.Report.ALL]
        },
        {
          routerLink: 'report/aacsb-teacher-protofilo',
          shape: 'contract', // id-badge
          displayName: 'AACSB Teacher Profile',
          permission: [...Permission.Report.ALL]
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
