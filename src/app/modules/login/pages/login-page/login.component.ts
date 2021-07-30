import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '@service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '@model/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  success: string|null = null;
  message: string|null = null;
  params: any;
  isCallback = false;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
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

        if (params.path) {
          this.router.navigate([params.path]);
        } else {
          this.router.navigate(['/']);
        }
      } else {
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

}
