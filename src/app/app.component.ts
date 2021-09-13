import { Component, OnInit } from '@angular/core';
import { InitializerService } from '@service/initializer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'MAYO Boardroom';

  constructor(private init: InitializerService) { }

  ngOnInit(): void { }
}
