import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsertScheduleRequest } from '../integration/request/insert-schedule.request';
import { ScheduleModel } from '../models/schedule.model';

@Injectable()
export class ScheduleRestService {

  constructor(
    private http: HttpClient
  ) { }

  private url = environment.schedule;

  public insertSchedule(request: InsertScheduleRequest): Observable<void> {
    return this.http.post<void>(`${this.url}`, request);
  }

  public updateSchedule(code: number, request: InsertScheduleRequest): Observable<void> {
    return this.http.patch<void>(`${this.url}/${code}`, request);
  }

  public getSchedules(): Observable<ScheduleModel[]> {
    return this.http.get<ScheduleModel[]>(`${this.url}`);
  }

  public removeSchedule(code: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${code}`);
  }

  public cancelSchedule(code?: number): Observable<void> {
    return this.http.patch<void>(`${this.url}/cancel/${code}`, null);
  }

  public finishSchedule(code: number): Observable<void> {
    return this.http.patch<void>(`${this.url}/finish/${code}`, null);
  }

}
