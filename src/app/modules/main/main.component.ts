import { Component, OnInit } from '@angular/core';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private ngProgress: NgProgress) { }
  progressRef: NgProgressRef = this.ngProgress.ref();

  ngOnInit(): void {
  }

}
