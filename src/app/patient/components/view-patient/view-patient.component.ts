import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Builder } from 'builder-pattern';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { PatientModel } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit, OnDestroy {

  @Input()
  public selectedPatient: PatientModel | undefined;

  @Output()
  public patientUpdated: EventEmitter<void> = new EventEmitter<void>();

  public editMode: boolean = false;
  public modal: BsModalRef = new BsModalRef;
  public form: FormGroup = this.formBuilder.group({});
  public subscriptions: Subscription = new Subscription();

  constructor(
    private service: PatientService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private alert: AlertService
  ) { }

  public ngOnInit(): void {
    this.generateForm();
    this.form.disable();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openModal(template: TemplateRef<any>): void {
    console.log(this.selectedPatient);
    const initialState = { class: 'modal-lg' };
    this.modal = this.modalService.show(template, initialState);
  }

  public closeModal(): void {
    this.modal.hide();
    this.form.disable();
  }

  public updatePatient(): void {
    if (this.selectedPatient?.code) {
      this.subscriptions.add(
        this.service.updatePatient(this.selectedPatient?.code, this.patient).subscribe(
          response => this.manageSuccessUpdatePatient(),
          error => this.manageErrorUpdatePatient(error)
        )
      );
    } else {
      this.manageErrorUpdatePatient();
    }
  }

  private manageSuccessUpdatePatient(): void {
    this.patientUpdated.emit();
    this.alert.success(`Sucesso!`, `Sucesso ao cadastrar paciente.`);
    this.closeModal();
    this.form.reset();
  }

  private manageErrorUpdatePatient(err?: any): void {
    this.alert.error(`Erro!`, `Erro ao cadastrar paciente. - ${err}`);
    this.form.reset();
  }

  private generateForm(): void {
    this.form = this.formBuilder.group({
      fullname: [this.selectedPatient?.fullname, Validators.required],
      birth: [this.selectedPatient?.birth, Validators.required],
      address: [this.selectedPatient?.address, Validators.required],
      gender: [this.selectedPatient?.gender, Validators.required],
      phone: [this.selectedPatient?.phone, Validators.required],
      email: [this.selectedPatient?.email, Validators.required]
    });
  }

  public activeEditMode(): void {
    this.editMode = true;
    this.form.enable();
  }

  get patient(): PatientModel {
    return this.form.getRawValue();
  }

}
