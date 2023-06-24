import { Component, EventEmitter, Inject } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { CourseList, Discipline } from '@model/response-data.model';
import { ReportDataService } from '@module/report-data/services/report-data.service';

@Component({
  selector: 'app-discipline-dg-filter',
  templateUrl: './discipline-dg-filter.component.html'
})
export class DisciplineDgFilterComponent implements ClrDatagridFilterInterface<CourseList> {
  ObjectKeys = Object.keys;
  changes: any = new EventEmitter<any>(false);
  disciplineList: Discipline[] = [];
  disciplines: { [disciplineId: string]: boolean } = {};
  selectedDisciplines: string[] = [];
  selectedDisciplinesCount: number = 0;

  constructor(@Inject(ReportDataService) private reportDataService: ReportDataService) {
    this.reportDataService.getDiscipline().subscribe(disciplines => {
      this.disciplineList = [...disciplines];
      disciplines.sort().forEach(disciplines => this.disciplines[disciplines.id] = false);
    });
  }
  
  // is this filter active? which means: is there any filter value set?
  isActive(): boolean { 
    return this.selectedDisciplinesCount > 0;
  }

  onSelectChanged() { 
    this.selectedDisciplinesCount = this.disciplines ? Object.keys(this.disciplines).filter(key => this.disciplines[key]).length : 0;
    this.selectedDisciplines = this.disciplines ? Object.keys(this.disciplines).filter(key => this.disciplines[key]) : [];
    this.changes.emit(true);
  }

  // Tests if an item matches a search text
  accepts() {
    return true;
  }
}