import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsertScheduleRequest } from '../integration/request/insert-schedule.request';
import { ScheduleMapper } from '../mappers/schedule.mapper';
import { ScheduleModel } from '../models/schedule.model';
import { ScheduleRestService } from './schedule-rest.service';

@Injectable()
export class ScheduleService {

  constructor(
    private rest: ScheduleRestService
  ) { }

  public insertSchedule(schedule: ScheduleModel): Observable<void> {
    const request: InsertScheduleRequest = ScheduleMapper.modelToRequest(schedule);
    return this.rest.insertSchedule(request);
  }

  public updateSchedule(code: number, schedule: ScheduleModel): Observable<void> {
    const request: InsertScheduleRequest = ScheduleMapper.modelToRequest(schedule);
    return this.rest.updateSchedule(code, request);
  }

  public getSchedules(): Observable<ScheduleModel[]> {
    return this.rest.getSchedules();
  }

  public removeSchedules(code: number): Observable<void> {
    return this.rest.removeSchedule(code);
  }
}