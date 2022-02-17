import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { DoctorModel } from 'src/app/doctor/models/doctor.model';
import { ScheduleModel } from 'src/app/schedule/models/schedule.model';
import { ScheduleService } from 'src/app/schedule/services/schedule.service';
import { LocalStorageKeysEnum } from 'src/app/shared/local-storage/local-storage-keys.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public doctor: DoctorModel = new DoctorModel();
  public doctorSchedules: ScheduleModel[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private scheduleService: ScheduleService
  ) { }

  public ngOnInit(): void {
    this.getDoctor();
    this.getDoctorSchedules();
    this.todaySchedules;
  }

  private getDoctor(): void {
    const doctor = localStorage.getItem(LocalStorageKeysEnum.DOCTOR)?.toString();
    this.doctor = JSON.parse(doctor ? doctor : ``);
  }

  private getDoctorSchedules(): void {
    if (this.doctor?.code) {
      this.subscriptions.add(
        this.scheduleService.getSchedulesByDoctor(this.doctor.code).subscribe(
          schedules => this.manageSuccessGetSchedules(schedules)
        )
      );
    }
  }

  private manageSuccessGetSchedules(schedules: ScheduleModel[]): void {
    this.doctorSchedules = schedules
  }

  get todaySchedules(): any {
    const today = moment().format('DD/MM/YYYY').toString();
    const tomorrow = moment().add(1, 'days').format('DD/MM/YYYY').toString();

    return this.doctorSchedules.filter(schedule => schedule.date == today);
  }

  get tomorrowSchedules(): any {
    const tomorrow = moment().add(1, 'days').format('DD/MM/YYYY').toString();

    return this.doctorSchedules.filter(schedule => schedule.date == tomorrow && schedule.status?.code == 3);
  }

  get todayDate(): string {
    return moment().format('DD/MM').toString();
  }

  get tomorrowDate(): string {
    return moment().add(1, 'days').format('DD/MM').toString();
  }

}
