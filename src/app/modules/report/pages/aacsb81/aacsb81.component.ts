import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';

import { NgProgress } from 'ngx-progressbar';

import { ReportService } from '@module/report/services/report.service';

import { Permission } from '@model/ApplicationPermission.model';
import { AacsbTable81, Discipline } from '@model/response-data.model';

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
  semester = [parseInt((new Date().getFullYear() - 1912).toString() + '1'), parseInt((new Date().getFullYear() - 1912).toString() + '2')];
  semesterList: number[] = [];

  // data
  aacsbTable81: AacsbTable81[] = [];
  disciplines: Discipline[] = [];
  tableSummary: AacsbTable81Summary[] = [];
  totalTableSummary: AacsbTable81Summary|undefined = undefined;

  load(event: any): void {
    this.aacsbTable81 = [];
    this.disciplines = [];

    if (this.semester === null) this.semester = event.model;
    if (this.semester.length == 0) return;

    combineLatest([
      this.reportService.getDisciplines(),
      this.reportService.getAacsb81Table({semester: [...this.semester]})
    ]).subscribe(([discipline, aacsb81Table]) => {
        this.aacsbTable81 = aacsb81Table.sort((a, b) => a.teacher.localeCompare(b.teacher, "zh-TW"));
        this.disciplines = discipline;
        this.caculateTableSummary();
      });
  }

  caculateTableSummary(): void {
    this.tableSummary = [];
    this.disciplines.forEach(d => {
      let disciplineData = this.aacsbTable81
        .filter(x => x.discipline == d.code);

      let pData = disciplineData.filter(x => x.workType == 'P');
      let sData = disciplineData.filter(x => x.workType == 'S');
      
      let pSummary = pData.reduce((prev, curr) => ({
        // profoilo
        basic: prev.basic + (curr.basic || 0) * curr.disciplineTotal / curr.creditTotal,
        applied: prev.applied + (curr.applied || 0) * curr.disciplineTotal / curr.creditTotal,
        teaching: prev.teaching + (curr.teaching || 0) * curr.disciplineTotal / curr.creditTotal,
        // types
        journal1: prev.journal1 + (curr.journal1 || 0) * curr.disciplineTotal / curr.creditTotal,
        journal2: prev.journal2 + (curr.journal2 || 0) * curr.disciplineTotal / curr.creditTotal,
        others: prev.others + (curr.others || 0) * curr.disciplineTotal / curr.creditTotal,
        // % of IC
        hasICDiscipline: prev.hasICDiscipline + (((curr.basic || 0) + (curr.applied || 0) + (curr.teaching || 0)) > 0 ? curr.disciplineTotal : 0),
        disciplineTotal: prev.disciplineTotal + curr.disciplineTotal,
        token: prev.token + 100 * curr.disciplineTotal / curr.creditTotal
      }), { basic: 0, applied: 0, teaching: 0, journal1: 0, journal2: 0, others: 0, hasICDiscipline: 0, disciplineTotal: 0, token: 0 });
      let sSummary = sData.reduce((prev, curr) => ({
        // % of IC
        token: prev.token + 36 * curr.disciplineTotal / curr.creditTotal,
        fullToken: prev.token + 100 * curr.disciplineTotal / curr.creditTotal,
      }), { token: 0, fullToken: 0 });

      this.tableSummary.push({
        basic: pSummary.basic,
        applied: pSummary.applied,
        teaching: pSummary.teaching,
        journal1: pSummary.journal1,
        journal2: pSummary.journal2,
        others: pSummary.others,
        pIC: pSummary.hasICDiscipline / pSummary.disciplineTotal,
        fteToken: (pSummary.token + sSummary.token) / (pSummary.token + sSummary.fullToken)
      });
    });
    this.totalTableSummary = this.tableSummary.reduce((prev, curr) => ({
      basic: prev.basic + curr.basic,
      applied: prev.applied + curr.applied,
      teaching: prev.teaching + curr.teaching,
      journal1: prev.journal1 + curr.journal1,
      journal2: prev.journal2 + curr.journal2,
      others: prev.others + curr.others,
      pIC: prev.pIC + curr.pIC,
      fteToken: prev.fteToken + curr.fteToken
    }), { basic: 0, applied: 0, teaching: 0, journal1: 0, journal2: 0, others: 0, pIC: 0, fteToken: 0 });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ aacsb81Table, disciplineList, semesterList }) => {
        this.aacsbTable81 = [...aacsb81Table].sort((a, b) => a.teacher.localeCompare(b.teacher, "zh-TW"));
        this.disciplines = [...disciplineList];
        this.semesterList = [...semesterList].sort((a, b) => b - a);
        this.caculateTableSummary();
      }
    );
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}

interface AacsbTable81Summary {
  basic: number;
  applied: number;
  teaching: number;
  journal1: number;
  journal2: number;
  others: number;
  pIC: number;
  fteToken: number;
}