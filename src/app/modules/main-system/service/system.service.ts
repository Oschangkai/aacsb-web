import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationResponse, SimpleResponse } from '@model/response.model';
import { AuditLog, Role, Roles, User, Users } from '@model/query.response.model';
import { environment } from '@environment/environment';
import { AuditLogQuery } from '@model/query.model';

const accountUrl = `${environment.api}/account`;
const logUrl = `${environment.api}/System/AuditLog`;

@Injectable()
export class SystemService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<SimpleResponse<Users[]>> {
    return this.http
      .get<SimpleResponse<Users[]>>(`${accountUrl}/user`, {
        params: new HttpParams()
          .append('page', '1')
          .append('pageSize', '1000')
      });
  }
  getUser(id: string): Observable<SimpleResponse<User>> {
    return this.http
      .get<SimpleResponse<User>>(`${accountUrl}/user/${id}`);
  }
  editUser(user: User): Observable<SimpleResponse<string>> {
    return this.http
      .patch<SimpleResponse<string>>(`${accountUrl}/user`, user);
  }
  addUser(user: User): Observable<SimpleResponse<string>> {
    return this.http
      .post<SimpleResponse<string>>(`${accountUrl}/user`, user);
  }
  deleteUser(userId: string): Observable<SimpleResponse<string>> {
    return this.http
      .delete<SimpleResponse<string>>(`${accountUrl}/user/${userId}`);
  }

  getRoles(): Observable<SimpleResponse<Roles[]>> {
    return this.http
      .get<SimpleResponse<Roles[]>>(`${accountUrl}/role`, {
        params: new HttpParams()
          .append('page', '1')
          .append('pageSize', '1000')
      });
  }
  getRole(id: string): Observable<SimpleResponse<Role>> {
    return this.http
      .get<SimpleResponse<Role>>(`${accountUrl}/role/${id}`);
  }
  editRole(role: Role): Observable<SimpleResponse<string>> {
    return this.http
      .patch<SimpleResponse<string>>(`${accountUrl}/role`, role);
  }
  addRole(role: Role): Observable<SimpleResponse<string>> {
    return this.http
      .post<SimpleResponse<string>>(`${accountUrl}/role`, role);
  }
  deleteRole(roleId: string): Observable<SimpleResponse<string>> {
    return this.http
      .delete<SimpleResponse<string>>(`${accountUrl}/role/${roleId}`);
  }
  getAuditLog(query: Partial<AuditLogQuery>): Observable<PaginationResponse<AuditLog[]>> {
    return this.http.get<PaginationResponse<AuditLog[]>>(`${logUrl}`, {
      params: new HttpParams({fromObject: query})
    });
  }

}
