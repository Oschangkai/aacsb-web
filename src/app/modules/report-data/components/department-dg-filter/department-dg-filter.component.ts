import { Component, EventEmitter, Inject } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { CourseList, Department, TeacherList } from '@model/response-data.model';
import { ReportDataService } from '@module/report-data/services/report-data.service';

@Component({
  selector: 'app-department-dg-filter',
  templateUrl: './department-dg-filter.component.html'
})
export class DepartmentDgFilterComponent implements ClrDatagridFilterInterface<CourseList | TeacherList> {
  ObjectKeys = Object.keys;
  changes: any = new EventEmitter<any>(false);
  departmentList: Department[] = [];
  departments: { [departmentId: string]: boolean } = {};
  selectedDepartments: string[] = [];
  selectedDepartmentsCount: number = 0;

  constructor(@Inject(ReportDataService) private reportDataService: ReportDataService) {
    this.reportDataService.getDepartments().subscribe(departments => {
      this.departmentList = [...departments];
      departments.sort().forEach(department => this.departments[department.id] = false);
    });
  }
  
  // is this filter active? which means: is there any filter value set?
  isActive(): boolean { 
    return this.selectedDepartmentsCount > 0;
  }

  onSelectChanged() { 
    this.selectedDepartmentsCount = this.departments ? Object.keys(this.departments).filter(key => this.departments[key]).length : 0;
    this.selectedDepartments = this.departments ? Object.keys(this.departments).filter(key => this.departments[key]) : [];
    this.changes.emit(true);
  }

  // Tests if an item matches a search text
  accepts() {
    return true;
  }
}