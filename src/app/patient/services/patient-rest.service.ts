import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsertPatientRequest } from '../integration/request/insert-patient.request';
import { PatientModel } from '../models/patient.model';

@Injectable()
export class PatientRestService {

  constructor(
    private http: HttpClient
  ) { }

  private url = environment.patient;

  public insertPatient(request: InsertPatientRequest): Observable<void> {
    return this.http.post<void>(`${this.url}`, request);
  }

  public updatePatient(code: number, request: InsertPatientRequest): Observable<void> {
    return this.http.patch<void>(`${this.url}/${code}`, request);
  }

  public getPatients(): Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(`${this.url}`);
  }

  public removePatient(code: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${code}`);
  }
}
