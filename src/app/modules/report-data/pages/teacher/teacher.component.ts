import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subscription } from 'rxjs';
import { NgProgress } from 'ngx-progressbar';

import { Permission } from '@model/ApplicationPermission.model';
import { Filter, FilterLogic, FilterOperator, PaginationFilter } from '@model/request-filter.model';
import { EditTeacher } from '@model/request.model';
import { Department, Qualification, TeacherList } from '@model/response-data.model';
import { PaginationResponse } from '@model/response.model';

import { ReportDataService } from '@here/services/report-data.service';
import { AlertService } from '@service/alert.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
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
  modalOpened = {edit: false};

  // data
  selected: Partial<TeacherList> = {};
  teachers: PaginationResponse<TeacherList> | undefined;
  teacherDetail: {[x: string]: EditTeacher} = {};
  departments: Department[] = [];
  qualifications: Qualification[] = [];
  keyword = '';
  filter: PaginationFilter = { pageNumber: 1, pageSize: 10 };

  getDepartmentName = (departmentId: string|null) => this.departments.find(d => d.id.toUpperCase() === departmentId?.trim().toUpperCase())?.name ?? '';
  getQualificationName = (qualificationId: string|null) => this.qualifications.find(q => q.id.toUpperCase() === qualificationId?.trim().toUpperCase())?.abbreviation ?? '';

  onEditClicked(teacher: TeacherList): void {
    this.selected = teacher;
    this.reportDataService.getTeacher(teacher.id).subscribe(t => this.teacherDetail[t.id] = t);
    this.modalOpened.edit = true;
  }
  onDeleteClicked(teacher: TeacherList): void {
    this.alertService.info(`Not yet implemented\nDelete ${teacher.name} clicked.`);
  }

  onGlobalSearchSubmit(): void {
    this.filter = { ...this.filter, keyword: this.keyword };
    this.load();
  }

  onEditSubmit(teacher: Partial<EditTeacher>): void {
    this.reportDataService.editTeacher(teacher).subscribe(_ => {
      this.modalOpened.edit = false;
      this.load();
    });
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
        } else if (filter.selectedQualificationsCount) {
          let qualificationFilter: Filter[] = [];
          filter.selectedQualifications.forEach((qualification: string) => {
            qualificationFilter.push({ field: 'QualificationId', operator: FilterOperator.EQ, value: qualification });
          });
          this.filter.advancedFilter.filters.push({ logic: FilterLogic.OR, filters: qualificationFilter})
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
    this.reportDataService.getTeachers(this.filter)
      .subscribe(data => {
        this.teachers = { ...data };
        this.teacherDetail = {};
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ teachers, departments, qualifications }) => {
        this.teachers = {...teachers};
        this.departments = [...departments];
        this.qualifications = [...qualifications];
      }
    );
  }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}