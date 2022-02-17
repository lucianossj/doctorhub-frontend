import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsertDoctorRequest } from '../integration/request/insert-doctor.request';
import { LoginDoctorRequest } from '../integration/request/login-doctor.request';
import { DoctorModel } from '../models/doctor.model';

@Injectable()
export class DoctorRestService {

  constructor(
    private http: HttpClient
  ) { }

  private url = environment.doctor;


  public login(login: LoginDoctorRequest): Observable<DoctorModel> {
    return this.http.post<DoctorModel>(`${this.url}/login`, login);
  }

  public insertDoctor(request: InsertDoctorRequest): Observable<void> {
    return this.http.post<void>(`${this.url}`, request);
  }

  public updateDoctor(code: number, request: InsertDoctorRequest): Observable<void> {
    return this.http.patch<void>(`${this.url}/${code}`, request);
  }

  public getDoctors(): Observable<DoctorModel[]> {
    return this.http.get<DoctorModel[]>(`${this.url}`);
  }

  public removeDoctor(code: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${code}`);
  }

}
