import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Permission } from '@model/ApplicationPermission.model';
import { AacsbTable32, Department } from '@model/response-data.model';
import { ReportService } from '@module/report/services/report.service';
import { NgProgress } from 'ngx-progressbar';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-aacsb32',
  templateUrl: './aacsb32.component.html',
  styleUrls: ['./aacsb32.component.scss']
})
export class Aacsb32Component {
  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private ngProgress: NgProgress
  ) {
    this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
      this.loadData = state.active;
    });
  }

  getQualifcationTotal(table: AacsbTable32[]): number {
    return table.reduce((prev, curr) => prev + curr.percentage, 0);
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ bachelorTable, masterTable, mbaTable, academicYearList, departmentList }) => {
        this.tableData = [
          { table: bachelorTable, title: 'Bachelor' },
          { table: masterTable, title: 'Master' },
          { table: mbaTable, title: 'MBA' }
        ];
        this.academicYearList = [...academicYearList];
        this.academicYear = this.academicYearList.sort((a, b) => b - a)[0];
        this.departmentList = [...departmentList];
        this.loadData = false;
      }
    );
  }

  load(): void {
    this.tableData = [];
    let postData: any = {
      semester: this.academicYear.toString()
    };
    if (this.department != "undefined") {
      postData['departmentId'] = this.department;
    }
    combineLatest([
      this.reportService.getAacsb32Table({...postData, type: 'bachelor'}),
      this.reportService.getAacsb32Table({...postData, type: 'master'}),
      this.reportService.getAacsb32Table({...postData, type: 'mba'})
    ]).subscribe(([bachelorTable, masterTable, mbaTable]) => {
        this.tableData = [
          { table: bachelorTable, title: 'Bachelor' },
          { table: masterTable, title: 'Master' },
          { table: mbaTable, title: 'MBA' }
        ];
      });
  }

  private httpStateSubscription: Subscription;
  // states
  Permission = Permission;
  loadData = true;
  academicYear = (new Date()).getFullYear() - 1912;
  academicYearList: number[] = [];
  department?: string = undefined;
  departmentList: Department[] = [];
  // data
  tableData: { table: AacsbTable32[], title: string }[] = [];

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
