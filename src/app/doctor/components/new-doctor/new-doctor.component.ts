import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { GenericDataModel } from 'src/app/shared/services/data/models/generic-data.model';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { DoctorModel } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-doctor',
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.css']
})
export class NewDoctorComponent implements OnInit, OnDestroy {

  @Output()
  public doctorInserted: EventEmitter<void> = new EventEmitter<void>();

  public specialties: GenericDataModel[] = [];
  public modal: BsModalRef = new BsModalRef;
  public form: FormGroup = this.formBuilder.group({});
  public subscriptions: Subscription = new Subscription();

  constructor(
    private service: DoctorService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private alert: AlertService
  ) { }

  public ngOnInit(): void {
    this.generateForm();
    this.getDoctorsSpecialty();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openModal(template: TemplateRef<any>): void {
    const initialState = { class: 'modal-lg' };
    this.modal = this.modalService.show(template, initialState);
  }

  public closeModal(): void {
    this.modal.hide();
  }

  public insertDoctor(): void {
    this.subscriptions.add(
      this.service.insertDoctor(this.doctor).subscribe(
        response => this.manageSuccessInsertDoctor(),
        error => this.manageErrorInsertDoctor(error)
      )
    );
  }

  private manageSuccessInsertDoctor(): void {
    this.alert.success(`Sucesso!`, `Sucesso ao cadastrar médico.`);
    this.closeModal();
    this.doctorInserted.emit();
  }

  private manageErrorInsertDoctor(err: any): void {
    this.alert.error(`Erro!`, `Erro ao cadastrar médico. - ${err}`);
  }

  public getDoctorsSpecialty(): void {
    this.subscriptions.add(
      this.service.doctorsSpecialty.subscribe(
        response => this.specialties = response
      )
    );
  }

  private generateForm(): void {
    this.form = this.formBuilder.group({
      fullname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      specialty: [1, Validators.required]
    });
  }

  get doctor(): DoctorModel {
    return this.form.getRawValue();
  }

  get specialtyIsSelected(): boolean {
    return !!this.doctor.specialty;
  }

}
