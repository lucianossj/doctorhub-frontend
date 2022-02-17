import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Builder } from 'builder-pattern';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { ScheduleModel } from '../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {

  @Input()
  public selectedSchedule: ScheduleModel = Builder<ScheduleModel>().build();

  @Output()
  public scheduleUpdated: EventEmitter<void> = new EventEmitter<void>();

  public modal: BsModalRef = new BsModalRef;
  public subscriptions: Subscription = new Subscription();

  constructor(
    private service: ScheduleService,
    private modalService: BsModalService,
    private alert: AlertService
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openModal(template: TemplateRef<any>): void {
    const initialState = { class: 'modal-lg' };
    this.modal = this.modalService.show(template, initialState);
  }

  public closeModal(): void {
    this.modal.hide();
  }

  public finishSchedule(): void {
    if (this.selectedSchedule?.code) {
      this.subscriptions.add(
        this.service.finishSchedule(this.selectedSchedule?.code).subscribe(
          response => this.manageSuccessFinishSchedule(),
          error => this.manageErrorFinishSchedule(error)
        )
      );
    } else {
      this.manageErrorFinishSchedule();
    }
  }

  private manageSuccessFinishSchedule(): void {
    this.scheduleUpdated.emit();
    this.alert.success(`Sucesso!`, `Atendimento realizado com sucesso.`);
    this.closeModal();
  }

  private manageErrorFinishSchedule(err?: any): void {
    this.alert.error(`Erro!`, `Erro ao finalizar consulta. - ${err}`);
  }

  public cancelSchedule(): void {
    this.alert.confirmation('Tem certeza que deseja cancelar essa consulta?', 'Confirmar')
      .then(result => {
        if (result) this.confirmCancel()
      });
  }

  private confirmCancel(): void {
    this.subscriptions.add(
      this.service.cancelSchedule(this.selectedSchedule.code).subscribe(
        () => this.manageScheduleCancelSuccess()
      )
    );
  }

  private manageScheduleCancelSuccess(): void {
    this.alert.success('Sucesso', 'Consulta cancelada com sucesso.');
    this.scheduleUpdated.emit();
  }

}
