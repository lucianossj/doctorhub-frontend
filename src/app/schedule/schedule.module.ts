import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSchedulesComponent } from './components/list-schedules/list-schedules.component';
import { ScheduleService } from './services/schedule.service';
import { ScheduleRestService } from './services/schedule-rest.service';



@NgModule({
  declarations: [
    ListSchedulesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ScheduleService,
    ScheduleRestService
  ]
})
export class ScheduleModule { }
