import { Builder } from "builder-pattern";
import { InsertDoctorRequest } from "../integration/request/insert-doctor.request";
import { DoctorFormModel } from "../models/doctor-form.model";
import { DoctorModel } from "../models/doctor.model";

export class DoctorMapper {

    public static formModelToRequest(model: DoctorFormModel): InsertDoctorRequest {
        return Builder<InsertDoctorRequest>()
            .fullname(model.fullname)
            .username(model.username)
            .password(model.password)
            .specialty(model.specialty)
        .build();
    }

}