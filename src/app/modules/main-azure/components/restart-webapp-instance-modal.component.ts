import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-restart-webapp-instance-modal',
  templateUrl: './restart-webapp-instance-modal.component.html'
})
export class RestartWebappInstanceModalComponent implements OnInit {

  constructor() { }

  // states
  @Input() opened = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  // data
  @Input() selected!: {farmId: string, workerName: string};

  onSubmitClicked(): void {
    this.onSubmit.emit(true);
  }

  ngOnInit(): void { }
}
