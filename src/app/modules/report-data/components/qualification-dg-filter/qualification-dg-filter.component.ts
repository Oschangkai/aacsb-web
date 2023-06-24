import { Component, EventEmitter, Inject } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { Qualification, TeacherList } from '@model/response-data.model';
import { ReportDataService } from '@module/report-data/services/report-data.service';

@Component({
  selector: 'app-qualification-dg-filter',
  templateUrl: './qualification-dg-filter.component.html'
})
export class QualificationDgFilterComponent implements ClrDatagridFilterInterface<TeacherList> {
  ObjectKeys = Object.keys;
  changes: any = new EventEmitter<any>(false);
  qualificationList: Qualification[] = [];
  qualifications: { [qualificationId: string]: boolean } = {};
  selectedQualifications: string[] = [];
  selectedQualificationsCount: number = 0;

  constructor(@Inject(ReportDataService) private reportDataService: ReportDataService) {
    this.reportDataService.getQualifications().subscribe(qualifications => {
      this.qualificationList = [...qualifications];
      qualifications.sort().forEach(qualifications => this.qualifications[qualifications.id] = false);
    });
  }
  
  // is this filter active? which means: is there any filter value set?
  isActive(): boolean { 
    return this.selectedQualificationsCount > 0;
  }

  onSelectChanged() { 
    this.selectedQualificationsCount = this.qualifications ? Object.keys(this.qualifications).filter(key => this.qualifications[key]).length : 0;
    this.selectedQualifications = this.qualifications ? Object.keys(this.qualifications).filter(key => this.qualifications[key]) : [];
    this.changes.emit(true);
  }

  // Tests if an item matches a search text
  accepts() {
    return true;
  }
}