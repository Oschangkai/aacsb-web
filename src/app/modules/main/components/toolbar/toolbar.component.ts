import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '@service/user.service';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {User} from '@model/User.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = new User();
    this.subscription = this.userService.currentUser.subscribe(u => this.user = u);
  }

  openDropdown = false;
  subscription: Subscription;
  user: User;

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
  }

}
