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
    return this.httpClient.get<Array<Espece>>('/especes')
  }

  createEspece(espece:Espece): Observable<EntityResponseType> {
    console.log("creaaaaaaaaaaate")
    return this.httpClient.post<Espece>('/especes', espece, { observe: 'response' });
  }

}
