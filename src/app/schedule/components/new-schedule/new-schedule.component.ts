import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { DoctorModel } from 'src/app/doctor/models/doctor.model';
import { PatientModel } from 'src/app/patient/models/patient.model';
import { ScheduleFormModel } from 'src/app/schedule/models/schedule-form.model';
import { ScheduleService } from 'src/app/schedule/services/schedule.service';
import { GenericDataModel } from 'src/app/shared/services/data/models/generic-data.model';
import { AlertService } from 'src/app/shared/services/utils/alert.service';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.css']
})
export class NewScheduleComponent implements OnInit {

  @Input()
  public status: GenericDataModel[] = [];

  @Input()
  public specialties: GenericDataModel[] = [];

  @Input()
  public doctors: DoctorModel[] = [];

  @Input()
  public patients: PatientModel[] = [];

  @Output()
  public scheduleInserted: EventEmitter<void> = new EventEmitter<void>();
  
  public modal: BsModalRef = new BsModalRef;
  public form: FormGroup = this.formBuilder.group({});
  public subscriptions: Subscription = new Subscription();

  constructor(
    private service: ScheduleService,
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
    this.form.reset();
  }

  public insertSchedule(): void {
    this.subscriptions.add(
      this.service.insertSchedule(this.schedule).subscribe(
        response => this.manageSuccessInsertSchedule(),
        error => this.manageErrorInsertSchedule(error)
      )
    );
  }

  private manageSuccessInsertSchedule(): void {
    this.scheduleInserted.emit();
    this.alert.success(`Sucesso!`, `Sucesso ao agendar nova consulta.`);
    this.closeModal();
    this.form.reset();
  }

  private manageErrorInsertSchedule(err: any): void {
    this.alert.error(`Erro!`, `Erro ao agendar consulta. - ${err}`);
    this.form.reset();
  }

  private generateForm(): void {
    this.form = this.formBuilder.group({
      date: [null, Validators.required],
      hour: [null, Validators.required],
      status: [3, Validators.required],
      specialty: [null, Validators.required],
      doctor: [null, Validators.required],
      patient: [null, Validators.required]
    });
  }
  
  get doctorsToSelect(): DoctorModel[] {
    const specialtyCode = this.form.get(`specialty`)?.value;
    return specialtyCode ? this.doctors.filter(doc => doc.specialty?.code == specialtyCode) : this.doctors;
  }

  get specialtyToSelect(): GenericDataModel[] {
    const doctorCode = this.form.get(`doctor`)?.value;
    const specialtyCode = this.doctors.find(doc => doc.code == doctorCode)?.specialty?.code;
    this.form.get(`specialty`)?.setValue(specialtyCode);
    return this.specialties;
  }

  get schedule(): ScheduleFormModel {
    return this.form.getRawValue();
  }

  get today(): string {
    return moment().format('YYYY-MM-DD');
  }

}
