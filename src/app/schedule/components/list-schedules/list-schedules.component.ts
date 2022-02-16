import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorModel } from 'src/app/doctor/models/doctor.model';
import { DoctorService } from 'src/app/doctor/services/doctor.service';
import { PatientModel } from 'src/app/patient/models/patient.model';
import { PatientService } from 'src/app/patient/services/patient.service';
import { GenericDataEndpointEnum } from 'src/app/shared/services/data/enum/generic-data-endpoint.enum';
import { GenericDataService } from 'src/app/shared/services/data/generic-data.service';
import { GenericDataModel } from 'src/app/shared/services/data/models/generic-data.model';
import { ScheduleModel } from '../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-list-schedules',
  templateUrl: './list-schedules.component.html',
  styleUrls: ['./list-schedules.component.css']
})
export class ListSchedulesComponent implements OnInit, OnDestroy {

  public schedules: ScheduleModel[] = [];
  public status: GenericDataModel[] = [];
  public specialties: GenericDataModel[] = [];
  public doctors: DoctorModel[] = [];
  public patients: PatientModel[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private service: ScheduleService,
    private genericService: GenericDataService,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) { }

  public ngOnInit(): void {
    this.getSchedules();
    this.getStatus();
    this.getSpecialties();
    this.getDoctors();
    this.getPatients();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getSchedules(): void {
    this.subscriptions.add(
      this.service.getSchedules().subscribe(
        schedules => this.schedules = schedules
      )
    );
  }

  public getStatus(): void {
    this.subscriptions.add(
      this.genericService.getGenericData(GenericDataEndpointEnum.STATUS).subscribe(
        status => this.status = status
      )
    );
  }

  public getSpecialties(): void {
    this.subscriptions.add(
      this.genericService.getGenericData(GenericDataEndpointEnum.SPEACIALTY).subscribe(
        specialties => this.specialties = specialties
      )
    );
  }

  public getDoctors(): void {
    this.subscriptions.add(
      this.doctorService.getDoctors().subscribe(
        doctors => this.doctors = doctors
      )
    );
  }

  public getPatients(): void {
    this.subscriptions.add(
      this.patientService.getPatients().subscribe(
        patients => this.patients = patients
      )
    );
  }

}
