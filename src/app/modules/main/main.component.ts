import { Component, OnInit } from '@angular/core';
import { NgProgress, NgProgressRef} from 'ngx-progressbar';
import { UserService } from '@service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private userService: UserService, private ngProgress: NgProgress) { }
  progressRef: NgProgressRef = this.ngProgress.ref('http-load');

  ngOnInit(): void {
    this.userService.deleteAllCookies();
  }

}
