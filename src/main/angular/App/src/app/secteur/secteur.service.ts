import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Secteur} from "../model/secteur";
import {Bassin} from "../model/bassin";


type EntityResponseType = HttpResponse<Secteur>;

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  constructor(private httpClient:HttpClient) { }

  getSecteurs() : Observable<Array<Secteur>> {
    return this.httpClient.get<Array<Secteur>>('/secteurs');
  }

  getSecteur(id: number) : Observable<Secteur> {
    return this.httpClient.get<Secteur>('/secteurs/' + id);
  }

  deleteSecteur(id: number): Observable<EntityResponseType> {
    return this.httpClient.delete<Secteur>('/secteurs/' + id, { observe: 'response' });
  }
  createSecteur(secteur:Secteur): Observable<EntityResponseType> {
    return this.httpClient.post<Secteur>('/secteurs', secteur, { observe: 'response' });
  }

  updateSecteur(secteur: Secteur): Observable<EntityResponseType> {
    return this.httpClient.post<Secteur>('/secteurs' + '/' + secteur.id, secteur, { observe: 'response' });
  }

  getBassins() : Observable<Array<Bassin>> {
    return this.httpClient.get<Array<Bassin>>('/bassins')
  }

  addBassin(idSecteur:number,idBassin:number){
    this.httpClient.get('/secteurs' + '/' + idSecteur +'/' +idBassin,{ observe: 'response' });
  }
}
