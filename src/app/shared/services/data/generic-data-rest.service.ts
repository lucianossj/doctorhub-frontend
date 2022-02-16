import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericDataEndpointEnum } from './enum/generic-data-endpoint.enum';
import { GenericDataModel } from './models/generic-data.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class GenericDataRestService {

  constructor(
    private http: HttpClient
  ) { }

  private url = environment.generic;

  public getGenericData(endpoint: GenericDataEndpointEnum): Observable<GenericDataModel[]> {
    return this.http.get<GenericDataModel[]>(`${this.url}/${endpoint}`);
  }
}
