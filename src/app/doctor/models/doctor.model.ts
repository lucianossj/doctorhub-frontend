import { GenericDataModel } from "src/app/shared/services/data/models/generic-data.model";

export class DoctorModel {
    constructor(
        public code?: number,
        public fullname?: string,
        public username?: string,
        public password?: string,
        public specialty?: GenericDataModel
    ) {}
}
