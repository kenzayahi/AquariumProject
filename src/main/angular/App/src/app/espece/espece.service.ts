import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Espece} from "../espece/espece";

type EntityResponseType = HttpResponse<Espece>;

@Injectable({
  providedIn: 'root'
})
export class EspeceService {

  constructor(private httpClient:HttpClient) { }

  getEspeces() : Observable<Array<Espece>> {
    return this.httpClient.get<Array<Espece>>('/especes');
  }

  getEspece(id: number) : Observable<Espece> {
    return this.httpClient.get<Espece>('/especes/' + id);
  }

  deleteEspece(id: number): Observable<EntityResponseType> {
    return this.httpClient.delete<Espece>('/especes/' + id, { observe: 'response' });
  }
  createEspece(espece:Espece): Observable<EntityResponseType> {
    return this.httpClient.post<Espece>('/especes', espece, { observe: 'response' });
  }

  updateEspece(espece: Espece): Observable<EntityResponseType> {
    return this.httpClient.post<Espece>('/especes' + '/' + espece.id, espece, { observe: 'response' });
  }
}
