import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Calendrier} from '../model/calendrier';
import {Employe} from "../model/employe";

type EntityResponseType = HttpResponse<Calendrier>;

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {

  constructor(private httpClient:HttpClient) { }

  getcalendriers() : Observable<Array<Calendrier>> {
    return this.httpClient.get<Array<Calendrier>>('/calendrier');
  }

  getCalendrier(id: number) : Observable<Calendrier> {
    return this.httpClient.get<Calendrier>('/calendrier/' + id);
  }

  deleteCalendrier(id: number): Observable<EntityResponseType> {
    return this.httpClient.delete<Calendrier>('/calendrier/' + id, { observe: 'response' });
  }

  createCalendrier(calendrier:Calendrier): Observable<EntityResponseType> {
    return this.httpClient.post<Calendrier>('/calendrier', calendrier, { observe: 'response' });
  }

  updateCalendrier(calendrier: Calendrier): Observable<EntityResponseType> {
    return this.httpClient.post<Calendrier>('/calendrier' + '/' + calendrier.id , calendrier, { observe: 'response' });
  }
}
