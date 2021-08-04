import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { User } from '@model/User.model';
import { UserService } from '@service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  success: string|null = null;
  message: string|null = null;
  params: any;
  isCallback = false;
  isLoggedIn = false;

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.params = params;
      if (params && params.token) {
        this.isCallback = true;

        this.userService.setUser(new User({
          id: params.id,
          email: params.email,
          token: params.token,
          refreshToken: params.refresh_token,
          expiredOn: params.expired_on,
          username: params.username
        }));
        this.userService.isLoggedIn
          .pipe(
            takeUntil(this.destroy$),
            filter(state => state)
          )
          .subscribe(ev => {
            if (params.path) {
              this.router.navigate([params.path]);
            } else {
              this.router.navigate(['/']);
            }
        });
      } else {
        this.userService.isLoggedIn
          .pipe(takeUntil(this.destroy$))
          .subscribe(state => this.isLoggedIn = state);
        this.userService.logout();
      }
      this.message = params.message;
      this.success = params.success;
    });
  }

  msSignIn(): boolean {
    this.userService.signInWithMicrosoft(this.params.path ?? '/');
    // https://stackoverflow.com/questions/275092/windows-location-href-not-working-on-firefox3
    return false; // Avoid NS_BINDING_ABORTED
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
