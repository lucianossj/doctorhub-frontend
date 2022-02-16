import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericDataEndpointEnum } from 'src/app/shared/services/data/enum/generic-data-endpoint.enum';
import { GenericDataService } from 'src/app/shared/services/data/generic-data.service';
import { GenericDataModel } from 'src/app/shared/services/data/models/generic-data.model';
import { InsertDoctorRequest } from '../integration/request/insert-doctor.request';
import { DoctorMapper } from '../mappers/doctor.mapper';
import { DoctorFormModel } from '../models/doctor-form.model';
import { DoctorModel } from '../models/doctor.model';
import { DoctorRestService } from './doctor-rest.service';

@Injectable()
export class DoctorService {

  constructor(
    private rest: DoctorRestService,
    private genericDataService: GenericDataService
  ) { }

  public insertDoctor(doctor: DoctorFormModel): Observable<void> {
    const request: InsertDoctorRequest = DoctorMapper.formModelToRequest(doctor);
    return this.rest.insertDoctor(request);
  }

  public updateDoctor(code: number, doctor: DoctorFormModel): Observable<void> {
    const request: InsertDoctorRequest = DoctorMapper.formModelToRequest(doctor);
    return this.rest.updateDoctor(code, request);
  }

  public getDoctors(): Observable<DoctorModel[]> {
    return this.rest.getDoctors();
  }

  public removeDoctor(code: number): Observable<void> {
    return this.rest.removeDoctor(code);
  }

  get doctorsSpecialty(): Observable<GenericDataModel[]> {
    return this.genericDataService.getGenericData(GenericDataEndpointEnum.SPEACIALTY);
  } 

}
