import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { PatientModel } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit, OnDestroy {

  @Output()
  public patientInserted: EventEmitter<void> = new EventEmitter<void>();
  
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
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openModal(template: TemplateRef<any>): void {
    const initialState = { class: 'modal-lg' };
    this.modal = this.modalService.show(template, initialState);
    console.log(123123)
  }

  public closeModal(): void {
    this.modal.hide();
  }

  public insertPatient(): void {
    this.subscriptions.add(
      this.service.insertPatient(this.patient).subscribe(
        response => this.manageSuccessInsertPatient(),
        error => this.manageErrorInsertPatient(error)
      )
    );
  }

  private manageSuccessInsertPatient(): void {
    this.patientInserted.emit();
    this.alert.success(`Sucesso!`, `Sucesso ao cadastrar paciente.`);
    this.closeModal();
    this.form.reset();
  }

  private manageErrorInsertPatient(err: any): void {
    this.alert.error(`Erro!`, `Erro ao cadastrar paciente. - ${err}`);
    this.form.reset();
  }

  private generateForm(): void {
    this.form = this.formBuilder.group({
      fullname: [null, Validators.required],
      birth: [null, Validators.required],
      address: [null, Validators.required],
      gender: ['Masculino', Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required]
    });
  }
  
  get patient(): PatientModel {
    return this.form.getRawValue();
  }

}
