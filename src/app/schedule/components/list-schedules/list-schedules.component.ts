import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorModel } from 'src/app/doctor/models/doctor.model';
import { DoctorService } from 'src/app/doctor/services/doctor.service';
import { PatientModel } from 'src/app/patient/models/patient.model';
import { PatientService } from 'src/app/patient/services/patient.service';
import { GenericDataEndpointEnum } from 'src/app/shared/services/data/enum/generic-data-endpoint.enum';
import { GenericDataService } from 'src/app/shared/services/data/generic-data.service';
import { GenericDataModel } from 'src/app/shared/services/data/models/generic-data.model';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
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
    private patientService: PatientService,
    private alert: AlertService
  ) { }

  public ngOnInit(): void {
    this.getData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public cancelSchedule(code: number): void {
    this.alert.confirmation('Tem certeza que deseja cancelar essa consulta?', 'Confirmar')
      .then(result => {
        if (result) this.confirmCancel(code)
      });
  }

  private confirmCancel(code: number): void {
    this.subscriptions.add(
      this.service.cancelSchedule(code).subscribe(
        () => this.manageScheduleCancelSuccess()
      )
    );
  }

  private manageScheduleCancelSuccess(): void {
    this.alert.success('Sucesso', 'Consulta cancelada com sucesso.');
    this.getData();
  }

  public getData(): void {
    this.getSchedules();
    this.getStatus();
    this.getSpecialties();
    this.getDoctors();
    this.getPatients();
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
