import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsertDoctorRequest } from '../integration/request/insert-doctor.request';

@Injectable()
export class DoctorRestService {

  constructor(
    private http: HttpClient
  ) { }

  private url = environment.doctor;

  public insertDoctor(request: InsertDoctorRequest): Observable<void> {
    return this.http.post<void>(`${this.url}`, request);
  }

}
