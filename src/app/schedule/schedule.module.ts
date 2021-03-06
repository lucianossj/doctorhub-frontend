import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSchedulesComponent } from './components/list-schedules/list-schedules.component';
import { ScheduleService } from './services/schedule.service';
import { ScheduleRestService } from './services/schedule-rest.service';
import { NewScheduleComponent } from './components/new-schedule/new-schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ViewScheduleComponent } from './components/view-schedule/view-schedule.component';



@NgModule({
  declarations: [
    ListSchedulesComponent,
    NewScheduleComponent,
    ViewScheduleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    ScheduleService,
    ScheduleRestService
  ]
})
export class ScheduleModule { }
