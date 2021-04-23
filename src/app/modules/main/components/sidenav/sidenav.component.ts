import { Component, OnInit } from '@angular/core';
import { Permission } from '@model/ApplicationPermission.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  Permission = Permission;

  constructor() { }

  ngOnInit(): void {
  }

}
