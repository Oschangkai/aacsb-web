import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationResponse, ResponseData, MessageResponse } from '@model/response.model';
import { AuditLog, Role, Roles, User, Users } from '@model/query.response.model';
import { AuditLogQuery } from '@model/query.model';
import { EnvironmentService } from '@service/environment.service';

@Injectable()
export class SystemService {

  constructor(private http: HttpClient, private environment: EnvironmentService) { }

  userUrl = `${this.environment.api}/users`;
  roleUrl = `${this.environment.api}/roles`;
  logUrl = `${this.environment.api}/personal/logs`;

  getUsers(): Observable<Users[]> {
    return this.http
      .get<Users[]>(`${this.userUrl}`);
  }
  getUserDetail(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.userUrl}/${id}`);
  }
  editUser(user: User): Observable<MessageResponse> {
    return this.http
      .patch<MessageResponse>(`${this.userUrl}`, user);
  }
  addUser(user: User): Observable<MessageResponse> {
    return this.http
      .post<MessageResponse>(`${this.userUrl}`, user);
  }
  deleteUser(userId: string): Observable<MessageResponse> {
    return this.http
      .delete<MessageResponse>(`${this.userUrl}/${userId}`);
  }

  getRoles(): Observable<Roles[]> {
    return this.http
      .get<Roles[]>(`${this.roleUrl}`);
  }
  getRoleDetail(id: string): Observable<Role> {
    return this.http
      .get<Role>(`${this.roleUrl}/${id}`);
  }
  editRole(role: Role): Observable<MessageResponse> {
    return this.http
      .patch<MessageResponse>(`${this.roleUrl}`, role);
  }
  addRole(role: Role): Observable<MessageResponse> {
    return this.http
      .post<MessageResponse>(`${this.roleUrl}`, role);
  }
  deleteRole(roleId: string): Observable<MessageResponse> {
    return this.http
      .delete<MessageResponse>(`${this.roleUrl}/${roleId}`);
  }
  getAuditLog(query: Partial<AuditLogQuery>): Observable<PaginationResponse<AuditLog>> {
    return this.http.get<PaginationResponse<AuditLog>>(`${this.logUrl}`, {
      params: new HttpParams({fromObject: query})
    });
  }

}
