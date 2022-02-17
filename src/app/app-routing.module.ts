import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { ListDoctorsComponent } from './doctor/components/list-doctors/list-doctors.component';
import { LoginComponent } from './login/components/login/login.component';
import { ListPatientsComponent } from './patient/components/list-patients/list-patients.component';
import { ListSchedulesComponent } from './schedule/components/list-schedules/list-schedules.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'doctors', component: ListDoctorsComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: ListPatientsComponent, canActivate: [AuthGuard] },
  { path: 'schedules', component: ListSchedulesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
