import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-new-doctor',
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.css']
})
export class NewDoctorComponent implements OnInit {

  public modal: BsModalRef = new BsModalRef;
  public form: FormGroup = this.formBuilder.group({});

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
  }

  public openModal(template: TemplateRef<any>): void {
    const initialState = { class: 'modal-lg' };
    this.modal = this.modalService.show(template, initialState);
  }

  public closeModal(): void {
    this.modal.hide();
  }

  public insertDoctor(): void {}

}
