import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { GenericDataModel } from 'src/app/shared/services/data/models/generic-data.model';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { DoctorFormModel } from '../../models/doctor-form.model';
import { DoctorModel } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {

  @Input()
  public specialties: GenericDataModel[] = [];

  @Input()
  public selectedDoctor: DoctorModel = new DoctorModel();

  @Output()
  public doctorUpdated: EventEmitter<void> = new EventEmitter<void>();

  public editMode: boolean = false;
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
    this.form.disable();
  }

  public openModal(template: TemplateRef<any>): void {
    const initialState = { class: 'modal-lg' };
    this.modal = this.modalService.show(template, initialState);
  }

  public closeModal(): void {
    this.modal.hide();
    this.form.disable();
  }

  public updateDoctor(): void {
    if (this.selectedDoctor?.code) {
      this.subscriptions.add(
        this.service.updateDoctor(this.selectedDoctor?.code, this.doctor).subscribe(
          response => this.manageSuccessUpdateDoctor(),
          error => this.manageErrorUpdateDoctor(error)
        )
      );
    } else {
      this.manageErrorUpdateDoctor();
    }
  }

  private manageSuccessUpdateDoctor(): void {
    this.doctorUpdated.emit();
    this.alert.success(`Sucesso!`, `Sucesso ao cadastrar médico.`);
    this.closeModal();
    this.form.reset();
  }

  private manageErrorUpdateDoctor(err?: any): void {
    this.alert.error(`Erro!`, `Erro ao cadastrar médico. - ${err}`);
    this.form.reset();
  }

  private generateForm(): void {
    this.form = this.formBuilder.group({
      fullname: [this.selectedDoctor.fullname, Validators.required],
      username: [this.selectedDoctor.username, Validators.required],
      password: [this.selectedDoctor.password, Validators.required],
      specialty: [this.selectedDoctor.specialty?.code, Validators.required]
    });
  }

  public activeEditMode(): void {
    this.editMode = true;
    this.form.enable();
  }

  get doctor(): DoctorFormModel {
    return this.form.getRawValue();
  }

}
