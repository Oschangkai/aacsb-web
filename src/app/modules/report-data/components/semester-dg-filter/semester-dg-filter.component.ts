import { Component, EventEmitter, Inject } from '@angular/core';
import { ClrDatagridFilterInterface } from "@clr/angular";
import { CourseList } from '@model/response-data.model';
import { ReportDataService } from '@module/report-data/services/report-data.service';

@Component({
  selector: 'app-semester-dg-filter',
  templateUrl: './semester-dg-filter.component.html',
})
export class SemesterDgFilterComponent implements ClrDatagridFilterInterface<CourseList> {
  ObjectKeys = Object.keys;
  changes: any = new EventEmitter<any>(false);
  semesters: { [semester: string]: boolean } = {};
  selectedSemesters: number[] = [];
  selectedSemestersCount: number = 0;

  constructor(@Inject(ReportDataService) private reportDataService: ReportDataService) {
    this.reportDataService.getSemesters().subscribe(semesters => {
      semesters.sort().forEach(semester => this.semesters[semester] = false);
    });
  }
  
  // is this filter active? which means: is there any filter value set?
  isActive(): boolean { 
    return this.selectedSemestersCount > 0;
  }

  onSelectChanged() { 
    this.selectedSemestersCount = this.semesters ? Object.keys(this.semesters).filter(key => this.semesters[key]).length : 0;
    this.selectedSemesters = this.semesters ? Object.keys(this.semesters).filter(key => this.semesters[key]).map(key => parseInt(key)) : [];
    this.changes.emit(true);
  }

  // Tests if an item matches a search text
  accepts(course: CourseList) {
    return true;
  }
}

// https://github.com/vmware-clarity/ng-clarity/blob/main/projects/demo/src/app/datagrid/utils/color-filter.ts
