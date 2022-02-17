import { Builder } from "builder-pattern";
import * as moment from 'moment';

import { InsertScheduleRequest } from "../integration/request/insert-schedule.request";
import { ScheduleFormModel } from "../models/schedule-form.model";
import { ScheduleModel } from "../models/schedule.model";

export class ScheduleMapper {
    
    public static formModelToRequest(model: ScheduleFormModel): InsertScheduleRequest {
        return Builder<InsertScheduleRequest>()
            .date(moment(model.date).format('DD/MM/YYYY'))
            .hour(model.hour)
            .status(model.status)
            .specialty(model.specialty)
            .doctor(model.doctor)
            .patient(model.patient)
        .build();
    }

    public static modelToRequest(model: ScheduleModel): InsertScheduleRequest {
        return Builder<InsertScheduleRequest>()
            .date(model.date)
            .hour(model.hour)
            .status(model.status?.code)
            .specialty(model.specialty?.code)
            .doctor(model.doctor?.code)
            .patient(model.patient?.code)
        .build();
    }

}