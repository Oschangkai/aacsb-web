import { Component, OnInit } from '@angular/core';
import {UserService} from '@service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private user: UserService,
    private router: Router
  ) { }

  openDropdown = false;
  email: string|null = null;

  ngOnInit(): void {
    this.email = this.user.getEmail();
  }

  logout(): void {
    this.user.clear();
  }

}
