import { Builder } from "builder-pattern";
import { InsertPatientRequest } from "../integration/request/insert-patient.request";
import { PatientModel } from "../models/patient.model";

export class PatientMapper {

    public static modelToRequest(model: PatientModel): InsertPatientRequest {
        return Builder<InsertPatientRequest>()
            .fullname(model.fullname)
            .birth(model.birth)
            .address(model.address)
            .gender(model.gender)
            .phone(model.phone)
            .email(model.email)
        .build();
    }

}