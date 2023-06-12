import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Permission } from '@model/ApplicationPermission.model';
import { CollectCoursesRequest } from '@model/query.model';
import { ReportDataService } from '@module/report-data/services/report-data.service';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {

  constructor(
    private route: ActivatedRoute,
    private reportDataService: ReportDataService,
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
  onCollectSubmit(request: CollectCoursesRequest): void {
    console.log({...request});
    this.reportDataService.collectCourses({...request})
      .subscribe(_ => this.modalOpened.collect = false);
  }
}
