import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';

import { Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';

import { User } from '@model/User.model';
import { UserService } from '@service/user.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngProgress: NgProgress
  ) {
    this.ngProgress.ref('http-load').state.pipe(takeUntil(this.destroy$)).subscribe(state => {
      this.submitBtnState = state.active ? ClrLoadingState.LOADING : ClrLoadingState.DEFAULT;
    });
  }

  // states
  success: string|null = null;
  message: string|null = null;
  params: any;
  isCallback = false;
  isLoggedIn = false;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  private destroy$: Subject<void> = new Subject<void>();

  // form
  loginForm: FormGroup = new FormGroup({
    tenant: new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  });
  user: User = new User();

  ngOnInit(): void {
    this.userService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(u => this.user = u);
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      // Sign-in with Microsoft acocunt callback flow
      this.params = params;
      if (params && params.token) {
        this.isCallback = true;

        this.userService.setUser(new User({
          token: params.token,
          refreshToken: params.refresh_token,
          expiredOn: params.expired_on
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
      // set default tenant on login page
      this.loginForm.get("tenant")?.setValue("root");
      this.message = params.message;
      this.success = params.success;
    });
  }

  usernamePasswordSignIn() {
    this.submitBtnState = ClrLoadingState.LOADING;
    this.userService.login({...this.loginForm.value})
      .subscribe(response => {
        this.isCallback = true;

        this.userService.setUser(new User({
          token: response.token,
          refreshToken: response.refreshToken,
          expiredOn: response.expireOn
        }));

        this.userService.isLoggedIn
          .pipe(
            takeUntil(this.destroy$),
            delay(1000),
            filter(state => state)
          )
          .subscribe(_ => {
            if (this.params.path) {
              this.router.navigate([this.params.path]);
            } else {
              this.router.navigate(['/']);
            }
        });
      });
  }

  msSignIn(): boolean {
    this.submitBtnState = ClrLoadingState.LOADING;
    this.userService.signInWithMicrosoft(this.params.path ?? '/');
    // https://stackoverflow.com/questions/275092/windows-location-href-not-working-on-firefox3
    return false; // Avoid NS_BINDING_ABORTED
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
