import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDoctorsComponent } from './components/list-doctors/list-doctors.component';
import { NewDoctorComponent } from './components/new-doctor/new-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListDoctorsComponent,
    NewDoctorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DoctorModule { }
