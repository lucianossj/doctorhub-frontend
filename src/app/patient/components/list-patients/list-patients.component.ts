import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { PatientModel } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  public patients: PatientModel[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private service: PatientService,
    private alert: AlertService
  ) { }

  public ngOnInit(): void {
    this.getPatients();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public removePatient(code: number): void {
    this.alert.confirmation('Tem certeza que deseja remover esse paciente?', 'Confirmar')
      .then(result => {
        if (result) this.confirmeDelete(code)
      });
  }

  private confirmeDelete(code: number): void {
    this.subscriptions.add(
      this.service.removePatient(code).subscribe(
        () => this.managePatientRemovalSuccess()
      )
    );
  }

  private managePatientRemovalSuccess(): void {
    this.alert.success('Sucesso', 'Médico removido com sucesso.');
    this.getPatients();
  }

  public getPatients(): void {
    this.subscriptions.add(
      this.service.getPatients().subscribe(
        patients => this.patients = patients
      )
    );
  }

}
