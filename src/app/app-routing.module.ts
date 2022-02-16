import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { ListDoctorsComponent } from './doctor/components/list-doctors/list-doctors.component';
import { ListPatientsComponent } from './patient/components/list-patients/list-patients.component';
import { ListSchedulesComponent } from './schedule/components/list-schedules/list-schedules.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'doctors', component: ListDoctorsComponent },
  { path: 'patients', component: ListPatientsComponent },
  { path: 'schedules', component: ListSchedulesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
