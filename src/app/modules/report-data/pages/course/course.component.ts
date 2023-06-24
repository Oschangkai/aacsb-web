import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subscription } from 'rxjs';
import { NgProgress } from 'ngx-progressbar';

import { Permission } from '@model/ApplicationPermission.model';
import { Filter, FilterLogic, FilterOperator, PaginationFilter } from '@model/request-filter.model';
import { CollectCoursesRequest } from '@model/request.model';
import { CourseList, Department, Discipline } from '@model/response-data.model';
import { PaginationResponse } from '@model/response.model';

import { ReportDataService } from '@here/services/report-data.service';
import { AlertService } from '@service/alert.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {

  constructor(
    private route: ActivatedRoute,
    private reportDataService: ReportDataService,
    private alertService: AlertService,
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
  modalOpened = {collect: false};

  // data
  courses: PaginationResponse<CourseList> | undefined;
  departments: Department[] = [];
  disciplines: Discipline[] = [];
  semesters: number[] = [];
  keyword = '';
  filter: PaginationFilter = { pageNumber: 1, pageSize: 10 };

  getDisciplineName = (disciplineId: string|undefined) => this.disciplines.find(d => d.id.toLocaleUpperCase() === disciplineId?.trim().toUpperCase())?.name ?? '';
  getDepartmentName = (departmentId: string|undefined) => this.departments.find(d => d.id.toLocaleUpperCase() === departmentId?.trim().toUpperCase())?.name ?? '';

  onEditClicked(course: CourseList): void {
    this.alertService.info(`Not yet implemented.\nEdit ${course.name} clicked.`);
  }
  onDeleteClicked(course: CourseList): void {
    this.alertService.info(`Not yet implemented\nDelete ${course.name} clicked.`);
  }

  submit(): void {
    this.filter = { ...this.filter, keyword: this.keyword };
    this.load();
  }

  refresh(state: ClrDatagridStateInterface): void {
    this.filter.advancedFilter = {};
    this.filter.advancedFilter.filters = [];
    this.filter.orderBy = [];

    if (state.filters) {
      this.filter.advancedFilter.logic = FilterLogic.AND;

      for (const filter of state.filters) {
        if (filter.selectedDepartmentsCount) {
          let departmentFilter: Filter[] = [];
          filter.selectedDepartments.forEach((department: string) => {
            departmentFilter.push({ field: 'DepartmentId', operator: FilterOperator.EQ, value: department });
          });
          this.filter.advancedFilter.filters.push({ logic: FilterLogic.OR, filters: departmentFilter})
        } else if (filter.selectedSemestersCount) {
          let semesterFilter: Filter[] = [];
          filter.selectedSemesters.forEach((semester: number) => {
            semesterFilter.push({ field: 'Semester', operator: FilterOperator.EQ, value: semester });
          });
          this.filter.advancedFilter.filters.push({ logic: FilterLogic.OR, filters: semesterFilter})
        } else if (filter.selectedDisciplinesCount) {
          let disciplineFilter: Filter[] = [];
          filter.selectedDisciplines.forEach((discipline: string) => {
            disciplineFilter.push({ field: 'DisciplineId', operator: FilterOperator.EQ, value: discipline });
          });
          this.filter.advancedFilter.filters.push({ logic: FilterLogic.OR, filters: disciplineFilter})
        } else {
          const { property, value } = filter as { property: string; value: string };
          this.filter.advancedFilter.filters.push({ field: property, operator: FilterOperator.CONTAINS, value: value });
        }
      }
    } else this.filter.advancedFilter = undefined;

    if(state.sort && state.sort.by) {
      this.filter.orderBy.push((<{by: string, reverse: boolean}>state.sort).by);
    } else this.filter.orderBy = undefined;

    this.filter = { ...this.filter, pageNumber: state.page?.current ?? 1, pageSize: state.page?.size ?? 10 };
    this.load();
  }

  load(): void {
    this.reportDataService.getCourses(this.filter)
      .subscribe(data => {
        this.courses = { ...data };
      });
  }

  onCollectSubmit(request: CollectCoursesRequest): void {
    this.reportDataService.collectCourses({...request})
      .subscribe(_ => this.modalOpened.collect = false);
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ courses, departments, disciplines }) => {
        this.courses = {...courses};
        this.departments = [...departments];
        this.disciplines = [...disciplines];
      }
    );
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
