import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EnvironmentService } from '@service/environment.service';

@Injectable()
export class DataService {
  constructor(private http: HttpClient, private environment: EnvironmentService) { }

  reportUrl = `${this.environment.api}/data`;
}