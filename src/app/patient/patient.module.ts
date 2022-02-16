import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPatientsComponent } from './components/list-patients/list-patients.component';
import { PatientService } from './services/patient.service';
import { PatientRestService } from './services/patient-rest.service';
import { NewPatientComponent } from './components/new-patient/new-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ViewPatientComponent } from './components/view-patient/view-patient.component';
@NgModule({
  declarations: [
    ListPatientsComponent,
    NewPatientComponent,
    ViewPatientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    PatientService,
    PatientRestService
  ]
})
export class PatientModule { }
