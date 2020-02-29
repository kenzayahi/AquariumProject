import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Secteur} from "../model/secteur";
import {Bassin} from "../model/bassin";
import {Activity} from "../model/activity";


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

  affecteBassin(idSecteur: number,idBassin:number) : Observable<Array<Secteur>> {
    return this.httpClient.get<Array<Secteur>>('/secteurBassin/'+ idSecteur+'/'+idBassin);
  }
  deleteBassin(idSecteur: number,idBassin:number) : Observable<Array<Secteur>> {
    return this.httpClient.get<Array<Secteur>>('/deleteBassinSecteur/'+ idSecteur+'/'+idBassin);
  }
}
