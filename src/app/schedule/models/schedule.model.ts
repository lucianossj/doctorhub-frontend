import { PatientModel } from "src/app/patient/models/patient.model";
import { GenericDataModel } from "src/app/shared/services/data/models/generic-data.model";
import { GenericPersonModel } from "src/app/shared/services/data/models/generic-person.model";

export class ScheduleModel {
    constructor(
        public code?: number,
        public date?: string,
        public hour?: string,
        public status?: GenericDataModel,
        public specialty?: GenericDataModel,
        public doctor?: GenericPersonModel,
        public patient?: PatientModel
    ) {}
}