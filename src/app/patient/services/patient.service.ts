import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsertPatientRequest } from '../integration/request/insert-patient.request';
import { PatientMapper } from '../mappers/patient.mapper';
import { PatientModel } from '../models/patient.model';
import { PatientRestService } from './patient-rest.service';

@Injectable()
export class PatientService {

  constructor(
    private rest: PatientRestService
  ) { }

  public insertPatient(patient: PatientModel): Observable<void> {
    const request: InsertPatientRequest = PatientMapper.modelToRequest(patient);
    return this.rest.insertPatient(request);
  }

  public updatePatient(code: number, patient: PatientModel): Observable<void> {
    const request: InsertPatientRequest = PatientMapper.modelToRequest(patient);
    return this.rest.updatePatient(code, request);
  }

  public getPatients(): Observable<PatientModel[]> {
    return this.rest.getPatients();
  }

  public removePatient(code: number): Observable<void> {
    return this.rest.removePatient(code);
  }

}
