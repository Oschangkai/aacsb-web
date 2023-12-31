import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';

import { NgProgress } from 'ngx-progressbar';

import { ReportService } from '@here/services/report.service';

import { Permission } from '@model/ApplicationPermission.model';
import { AacsbTable31, Discipline } from '@model/response-data.model';
import { EnvironmentService } from '@service/environment.service';

@Component({
  selector: 'app-aacsb31',
  templateUrl: './aacsb31.component.html',
  styleUrls: ['./aacsb31.component.scss']
})
export default class Aacsb31Component {

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    protected env: EnvironmentService,
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
  debugMode = !this.env.production;
  semester = [parseInt((new Date().getFullYear() - 1912).toString() + '1'), parseInt((new Date().getFullYear() - 1912).toString() + '2')];
  semesterList: number[] = [];
  showTeachers = false;
  // data
  aacsbTable31: AacsbTable31[] = [];
  tableSummary: {disciplineTotal: disciplineTotal[], grandTotal: grandTotal} = {
    disciplineTotal: [], 
    grandTotal: { fullTime: 0, partTime: 0, contactHourRatio: 0, SA: 0, PA: 0, SP: 0, IP: 0, A: 0, pSA: 0, pPA: 0, pIP: 0, pSP: 0, pA: 0, pDevoted: 0 }
  };
  discipline: number|null = null;
  disciplines: Discipline[] = [];

  roundTo = (num: number, decimal: number) => Math.round((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);

  caculateTableSummary(): void {
    this.tableSummary.disciplineTotal = [];
    this.tableSummary.grandTotal = { 
      fullTime: 0, partTime: 0, contactHourRatio: 0, SA: 0, PA: 0, SP: 0, IP: 0, A: 0, pSA: 0, pPA: 0, pIP: 0, pSP: 0, pA: 0, pDevoted: 0 
    };
    let grandTotalTotal = 0;
    this.disciplines.forEach(d => {
      let disciplineData = this.aacsbTable31
        .filter(x => x.discipline == d.code);

      let fullTime = disciplineData.filter(x => x.workType == 'P').reduce((prev, curr) => prev + curr.disciplineTotal, 0);
      let partTime = disciplineData.filter(x => x.workType == 'S').reduce((prev, curr) => prev + curr.disciplineTotal, 0);

      let SA = disciplineData
        .filter(x => x.qualification == 'SA')
        .reduce((prev, curr) => prev + (curr.workType == 'S' ? (curr.disciplineTotal >= 9 ? 9 : curr.disciplineTotal) * 4 : curr.disciplineTotal / curr.creditTotal * 100), 0);
      let PA = disciplineData
        .filter(x => x.qualification == 'PA')
        .reduce((prev, curr) => prev + (curr.workType == 'S' ? (curr.disciplineTotal >= 9 ? 9 : curr.disciplineTotal) * 4 : curr.disciplineTotal / curr.creditTotal * 100), 0);
      let SP = disciplineData
        .filter(x => x.qualification == 'SP')
        .reduce((prev, curr) => prev + (curr.workType == 'S' ? (curr.disciplineTotal >= 9 ? 9 : curr.disciplineTotal) * 4 : curr.disciplineTotal / curr.creditTotal * 100), 0);
      let IP = disciplineData
        .filter(x => x.qualification == 'IP')
        .reduce((prev, curr) => prev + (curr.workType == 'S' ? (curr.disciplineTotal >= 9 ? 9 : curr.disciplineTotal) * 4 : curr.disciplineTotal / curr.creditTotal * 100), 0);
      let A = disciplineData
        .filter(x => (x.qualification == null || x.qualification == 'A'))
        .reduce((prev, curr) => prev + (curr.workType == 'S' ? (curr.disciplineTotal >= 9 ? 9 : curr.disciplineTotal) * 4 : curr.disciplineTotal / curr.creditTotal * 100), 0);
      let total = SA + PA + SP + IP + A;

      this.tableSummary.disciplineTotal.push({
        code: d.code,
        fullTime, partTime,
        contactHourRatio: fullTime / (fullTime + partTime),
        SA, PA, SP, IP, A,
        pSA: SA / total,
        pPA: PA / total,
        pSP: SP / total,
        pIP: IP / total,
        pA: A / total,
        pDevoted: (SA + PA + SP + IP) / total
      });

      if (d.code == null || d.code == 0) return;

      // grand total
      this.tableSummary.grandTotal.fullTime += fullTime;
      this.tableSummary.grandTotal.partTime += partTime;
      this.tableSummary.grandTotal.SA += SA;
      this.tableSummary.grandTotal.PA += PA;
      this.tableSummary.grandTotal.SP += SP;
      this.tableSummary.grandTotal.IP += IP;
      this.tableSummary.grandTotal.A += A;
      grandTotalTotal += total;
      this.tableSummary.grandTotal.pDevoted += (SA + PA + SP + IP);
    });

    this.tableSummary.grandTotal.contactHourRatio = this.tableSummary.grandTotal.fullTime / (this.tableSummary.grandTotal.fullTime + this.tableSummary.grandTotal.partTime);
    this.tableSummary.grandTotal.pSA = this.tableSummary.grandTotal.SA / grandTotalTotal;
    this.tableSummary.grandTotal.pPA = this.tableSummary.grandTotal.PA / grandTotalTotal;
    this.tableSummary.grandTotal.pSP = this.tableSummary.grandTotal.SP / grandTotalTotal;
    this.tableSummary.grandTotal.pIP = this.tableSummary.grandTotal.IP / grandTotalTotal;
    this.tableSummary.grandTotal.pA = this.tableSummary.grandTotal.A / grandTotalTotal;
    this.tableSummary.grandTotal.pDevoted = this.tableSummary.grandTotal.pDevoted / grandTotalTotal;
  }

  countDisciplineTeacher(discipline: number): number {
    return this.aacsbTable31.filter(x => x.discipline == discipline).length;
  }

  load(event: any): void {
    this.aacsbTable31 = [];
    this.disciplines = [];

    if (this.semester === null) this.semester = event.model;
    if (this.semester.length == 0) return;

    combineLatest([
      this.reportService.getDisciplines(), 
      this.discipline === null ? 
        this.reportService.getAacsb31Table({semester: [...this.semester]}) : 
        this.reportService.getAacsb31TableByDiscipline({semester: [...this.semester], discipline: this.discipline})
    ]).subscribe(([discipline, aacsb31Table]) => {
        this.disciplines = discipline;
        this.disciplines.unshift({code: 0, name: 'Not Categorized (Debug Only)', id: ''});
        this.aacsbTable31 = aacsb31Table.sort((a, b) => a.teacherEnglishName.localeCompare(b.teacherEnglishName, "zh-TW"));
        this.caculateTableSummary();
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ aacsb31Table, disciplineList, semesterList }) => {
        this.aacsbTable31 = [...aacsb31Table].sort((a, b) => a.teacherEnglishName.localeCompare(b.teacherEnglishName, "zh-TW"));
        this.disciplines = [...disciplineList];
        this.semesterList = [...semesterList].sort((a, b) => b - a);
        this.disciplines.unshift({code: 0, name: 'Not Categorized (Debug Only)', id: ''});
        this.caculateTableSummary();
      }
    );
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }

}

interface disciplineTotal {
  code: number;
  fullTime: number;
  partTime: number;
  contactHourRatio: number;
  SA: number;
  pSA: number;
  PA: number;
  pPA: number;
  SP: number;
  pSP: number;
  IP: number;
  pIP: number;
  A: number;
  pA: number;
  pDevoted: number;
}

interface grandTotal {
  fullTime: number;
  partTime: number;
  contactHourRatio: number;
  SA: number;
  PA: number;
  SP: number;
  IP: number;
  A: number;
  pSA: number;
  pPA: number;
  pSP: number;
  pIP: number;
  pA: number;
  pDevoted: number;
}
