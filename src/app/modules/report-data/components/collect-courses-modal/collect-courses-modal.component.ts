import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgProgress } from 'ngx-progressbar';

import { ClrLoadingState } from '@clr/angular';

import { CollectCoursesRequest } from '@model/query.model';
import { ReportDataService } from '@here/services/report-data.service';
import { Department } from '@model/query.response.model';


@Component({
  selector: 'app-collect-courses-modal',
  templateUrl: './collect-courses-modal.component.html',
  styleUrls: ['./collect-courses-modal.component.scss']
})
export class CollectCoursesModalComponent implements OnInit, OnDestroy {
  constructor(
    private ngProgress: NgProgress,
    private reportDataService: ReportDataService
  ) {
    this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
      this.loadData = state.active;
      this.submitBtnState = state.active ? ClrLoadingState.LOADING : ClrLoadingState.DEFAULT;
    });
  }
  private httpStateSubscription: Subscription;

  // states
  loadData = true;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  allDepartments = true;
  @Input() opened = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSubmit: EventEmitter<CollectCoursesRequest> = new EventEmitter<CollectCoursesRequest>();
  
  // data
  request: CollectCoursesRequest = {year: (new Date()).getFullYear() - 1911, semester: 1, department: undefined};
  departmentList: Department[] = [];
  department: {[x: string]: boolean} = {};
  ObjectKeys = Object.keys;

  onSubmitClicked(): void {
    const request: CollectCoursesRequest = {
      year: this.request.year,
      semester: this.request.semester
    };
    if (!this.allDepartments) {
      request.department = Object.keys(this.department).filter(key => this.department[key]);
    }
    this.onSubmit.emit(request);
  }

  getCheckboxName(abbr: string): string | undefined {
    let d = this.departmentList.find(d => d.abbreviation === abbr);
    return d?.englishName + ' (' + d?.abbreviation + ')';
  }

  ngOnInit(): void {
    if (((new Date()).getMonth() + 1) / 6 >= 1) {
      this.request.semester += 1;
      this.request.year -= 1;
    }
    this.reportDataService.getDepartments().subscribe(response => {
      this.departmentList = response;
      this.department = response
        .map(d => d.abbreviation)
        .filter(val => val !== 'OTHERS')
        // @ts-ignore
        .reduce((acc, curr) => (acc[curr] = true, acc), {});
    });
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
