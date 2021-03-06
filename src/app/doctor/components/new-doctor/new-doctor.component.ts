import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { GenericDataModel } from 'src/app/shared/services/data/models/generic-data.model';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { DoctorFormModel } from '../../models/doctor-form.model';
import { DoctorModel } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-doctor',
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.css']
})
export class NewDoctorComponent implements OnInit, OnDestroy {

  @Input()
  public specialties: GenericDataModel[] = [];

  @Output()
  public doctorInserted: EventEmitter<void> = new EventEmitter<void>();
  
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
    this.doctorInserted.emit();
    this.alert.success(`Sucesso!`, `Sucesso ao cadastrar m??dico.`);
    this.closeModal();
    this.form.reset();
  }

  private manageErrorInsertDoctor(err: any): void {
    this.alert.error(`Erro!`, `Erro ao cadastrar m??dico. - ${err}`);
    this.form.reset();
  }

  private generateForm(): void {
    this.form = this.formBuilder.group({
      fullname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      specialty: [1, Validators.required]
    });
  }
  
  get doctor(): DoctorFormModel {
    return this.form.getRawValue();
  }

}
