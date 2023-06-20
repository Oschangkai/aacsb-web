
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgProgress } from 'ngx-progressbar';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';

import { Department, Qualification } from '@model/response-data.model';
import { EditTeacher } from '@model/request.model';
import { ReportDataService } from '@module/report-data/services/report-data.service';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html',
  styleUrls: ['./edit-teacher-modal.component.scss'],
  providers: [DatePipe]
})
export class EditTeacherModalComponent implements OnInit, OnDestroy {

  constructor(
    private ngProgress: NgProgress,
    private reportDataService: ReportDataService,
    private datePipe: DatePipe
  ) {
    this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
      this.loadData = state.active;
      this.submitBtnState = state.active ? ClrLoadingState.LOADING : ClrLoadingState.DEFAULT;
    });
  }
  private httpStateSubscription: Subscription;
  private data$ = new BehaviorSubject<Partial<EditTeacher>>({});

  // states
  loadData = true;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  @Input() opened = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSubmit: EventEmitter<Partial<EditTeacher>> = new EventEmitter<Partial<EditTeacher>>();

  // data
  @Input()
  set teacher(value: Partial<EditTeacher>) {
    this.data$.next(value);
  }
  get teacher(): Partial<EditTeacher> {
    return this.data$.getValue();
  }
  teacherResignDate: string | Date | null | undefined = undefined;
  teacherResponsibilities: string[] = [];
  qualifications: Qualification[] = [];
  departments: Department[] = [];
  ObjectKeys = Object.keys;

  onSubmitClicked(): void {
    if (!this.teacher) { return; }
    this.teacher.resignDate = (this.teacherResignDate == '') ? null : this.datePipe.transform(this.teacherResignDate, 'yyyy-MM-dd');
    this.teacher.responsibilities = this.teacherResponsibilities ? this.teacherResponsibilities.join(',') : null;
    this.onSubmit.emit(this.teacher);
  }

  ngOnInit(): void {
    this.data$
      .pipe(takeWhile(() => !this.teacher, true))
      .subscribe(data => {
        if (data) {
          this.teacherResponsibilities = this.teacher.responsibilities ? this.teacher.responsibilities.split(',') : [];
          this.teacherResignDate = this.teacher.resignDate ? this.datePipe.transform(this.teacher.resignDate, 'yyyy/MM/dd') : null;
          combineLatest([
            this.reportDataService.getQualifications(),
            this.reportDataService.getDepartments(),
          ]).subscribe(([qualifications, departments]) => {
            this.qualifications = [...qualifications];
            this.departments = [...departments];
          });
        }
      });

  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}

