import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericDataEndpointEnum } from './enum/generic-data-endpoint.enum';
import { GenericDataRestService } from './generic-data-rest.service';
import { GenericDataModel } from './models/generic-data.model';

@Injectable()
export class GenericDataService {

  constructor(
    private restService: GenericDataRestService
  ) { }

  public getGenericData(endpoint: GenericDataEndpointEnum): Observable<GenericDataModel[]> {
    return this.restService.getGenericData(endpoint);
  }
}
