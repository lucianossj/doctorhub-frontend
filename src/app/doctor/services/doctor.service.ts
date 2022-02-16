import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericDataEndpointEnum } from 'src/app/shared/services/data/enum/generic-data-endpoint.enum';
import { GenericDataService } from 'src/app/shared/services/data/generic-data.service';
import { GenericDataModel } from 'src/app/shared/services/data/models/generic-data.model';
import { InsertDoctorRequest } from '../integration/request/insert-doctor.request';
import { DoctorMapper } from '../mappers/doctor.mapper';
import { DoctorModel } from '../models/doctor.model';
import { DoctorRestService } from './doctor-rest.service';

@Injectable()
export class DoctorService {

  constructor(
    private rest: DoctorRestService,
    private genericDataService: GenericDataService
  ) { }

  public insertDoctor(doctor: DoctorModel): Observable<void> {
    const request: InsertDoctorRequest = DoctorMapper.modelToRequest(doctor);
    return this.rest.insertDoctor(request);
  }

  get doctorsSpecialty(): Observable<GenericDataModel[]> {
    return this.genericDataService.getGenericData(GenericDataEndpointEnum.SPEACIALTY);
  } 

}
