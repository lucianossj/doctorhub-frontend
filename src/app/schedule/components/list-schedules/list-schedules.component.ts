import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScheduleModel } from '../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-list-schedules',
  templateUrl: './list-schedules.component.html',
  styleUrls: ['./list-schedules.component.css']
})
export class ListSchedulesComponent implements OnInit, OnDestroy {

  public schedules: ScheduleModel[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private service: ScheduleService
  ) { }

  public ngOnInit(): void {
    this.getSchedules();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getSchedules(): void {
    this.subscriptions.add(
      this.service.getSchedules().subscribe(
        schedules => this.schedules = schedules
      )
    );
  }

}
