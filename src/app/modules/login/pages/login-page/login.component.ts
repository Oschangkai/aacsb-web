import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '@service/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  message: string|null = null;
  isCallback = false;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.message = params.message;
    });
  }

  msSignIn(): boolean {
    this.userService.signInWithMicrosoft('/');
    // https://stackoverflow.com/questions/275092/windows-location-href-not-working-on-firefox3
    return false; // Avoid NS_BINDING_ABORTED
  }

}
