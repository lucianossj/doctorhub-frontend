import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDoctorsComponent } from './components/list-doctors/list-doctors.component';
import { NewDoctorComponent } from './components/new-doctor/new-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from './services/doctor.service';
import { DoctorRestService } from './services/doctor-rest.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewDoctorComponent } from './components/view-doctor/view-doctor.component';



@NgModule({
  declarations: [
    ListDoctorsComponent,
    NewDoctorComponent,
    ViewDoctorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DoctorService,
    DoctorRestService
  ]
})
export class DoctorModule { }
