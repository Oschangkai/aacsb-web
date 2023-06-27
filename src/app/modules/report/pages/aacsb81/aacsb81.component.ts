import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';

import { NgProgress } from 'ngx-progressbar';

import { ReportService } from '@module/report/services/report.service';

import { Permission } from '@model/ApplicationPermission.model';
import { Discipline } from '@model/response-data.model';

@Component({
  selector: 'app-aacsb81',
  templateUrl: './aacsb81.component.html',
  styleUrls: ['./aacsb81.component.scss']
})
export class Aacsb81Component {
    constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private ngProgress: NgProgress
) {
  this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
    this.loadData = state.active;
  });
}
  private httpStateSubscription: Subscription;

  // states
  Permission = Permission;
  loadData = true;
  academicYear = (new Date()).getFullYear() - 1912;
  academicYearList: number[] = [];

  // data
  aacsbTable81: number[] = [];
  disciplines: Discipline[] = [];


  load(): void {
    this.aacsbTable81 = [1];
    this.disciplines = [];
    combineLatest([
      this.reportService.getDisciplines()
    ]).subscribe(([discipline]) => {
      this.disciplines = discipline;
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ disciplineList, academicYearList }) => {
        this.disciplines = [...disciplineList];
        this.academicYearList = [...academicYearList];
        this.academicYear = this.academicYearList.sort((a, b) => b - a)[0];
      }
    );
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
