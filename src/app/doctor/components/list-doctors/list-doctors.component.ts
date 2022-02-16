import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenericDataModel } from 'src/app/shared/services/data/models/generic-data.model';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { DoctorModel } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListDoctorsComponent implements OnInit, OnDestroy {

  public doctors: DoctorModel[] = [];
  public specialties: GenericDataModel[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private service: DoctorService,
    private alert: AlertService
  ) { }

  public ngOnInit(): void {
    this.getDoctors();
    this.getDoctorsSpecialty();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public removeDoctor(code: number): void {
    this.alert.confirmation('Tem certeza que deseja remover esse médico?', 'Confirmar')
      .then(result => {
        if (result) this.confirmeDelete(code)
      });
  }

  private confirmeDelete(code: number): void {
    this.subscriptions.add(
      this.service.removeDoctor(code).subscribe(
        () => this.manageDoctorRemovalSuccess()
      )
    );
  }

  private manageDoctorRemovalSuccess(): void {
    this.alert.success('Sucesso', 'Médico removido com sucesso.');
    this.getDoctors();
  }

  public getDoctors(): void {
    this.subscriptions.add(
      this.service.getDoctors().subscribe(
        doctors => this.doctors = doctors
      )
    );
  }

  public getDoctorsSpecialty(): void {
    this.subscriptions.add(
      this.service.doctorsSpecialty.subscribe(
        response => this.specialties = response
      )
    );
  }

}
