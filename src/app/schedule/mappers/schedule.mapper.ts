import { Builder } from "builder-pattern";
import { InsertScheduleRequest } from "../integration/request/insert-schedule.request";
import { ScheduleModel } from "../models/schedule.model";

export class ScheduleMapper {
    
    public static modelToRequest(model: ScheduleModel): InsertScheduleRequest {
        return Builder<InsertScheduleRequest>()
            .date(model.date)
            .hour(model.hour)
            .status(model.status.code)
            .specialty(model.specialty.code)
            .doctor(model.doctor.code)
            .patient(model.patient.code)
        .build();
    }

}