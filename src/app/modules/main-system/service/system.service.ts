import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SimpleResponse} from '@model/response.model';
import {Role, Roles, User, Users} from '@model/query.response.model';
import { environment } from '@environment/environment';

const baseUrl = environment.api;
const accountUrl = `${environment.api}/account`;

@Injectable()
export class SystemService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<SimpleResponse<Users>> {
    return this.http
      .get<SimpleResponse<Users>>(`${accountUrl}/user`, {
        params: new HttpParams()
          .append('page', '1')
          .append('pageSize', '1000')
      });
  }
  getRoles(): Observable<SimpleResponse<Roles>> {
    return this.http
      .get<SimpleResponse<Roles>>(`${accountUrl}/role`, {
        params: new HttpParams()
          .append('page', '1')
          .append('pageSize', '1000')
      });
  }

  getUser(id: string): Observable<SimpleResponse<User>> {
    return this.http
      .get<SimpleResponse<User>>(`${accountUrl}/user/${id}`);
  }
  getRole(id: string): Observable<SimpleResponse<Role>> {
    return this.http
      .get<SimpleResponse<Role>>(`${accountUrl}/role/${id}`);
  }

  editRole(role: Role): Observable<SimpleResponse<Role>> {
    return this.http
      .patch<SimpleResponse<Role>>(`${accountUrl}/role`, role);
  }

}
