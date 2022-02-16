import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPatientsComponent } from './components/list-patients/list-patients.component';
import { PatientService } from './services/patient.service';
import { PatientRestService } from './services/patient-rest.service';



@NgModule({
  declarations: [
    ListPatientsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PatientService,
    PatientRestService
  ]
})
export class PatientModule { }
