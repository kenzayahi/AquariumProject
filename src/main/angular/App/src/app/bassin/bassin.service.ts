import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bassin} from "../model/bassin";

type EntityResponseType = HttpResponse<Bassin>;

@Injectable({
  providedIn: 'root'
})
export class BassinService {

  constructor(private httpClient:HttpClient) { }

  getBassins() : Observable<Array<Bassin>> {
    return this.httpClient.get<Array<Bassin>>('/bassins');
  }

  getBassin(id: number) : Observable<Bassin> {
    return this.httpClient.get<Bassin>('/bassins/' + id);
  }

  deleteBassin(id: number): Observable<EntityResponseType> {
    return this.httpClient.delete<Bassin>('/bassins/' + id, { observe: 'response' });
  }
  affecteEspece(idBassin: number,idEspece:number) : Observable<Array<Bassin>> {
    return this.httpClient.get<Array<Bassin>>('/bassins/'+ idBassin+'/'+idEspece);
  }

  createBassin(bassin:Bassin): Observable<EntityResponseType> {
    return this.httpClient.post<Bassin>('/bassins', bassin, { observe: 'response' });
  }

  updateBassin(bassin: Bassin): Observable<EntityResponseType> {
    return this.httpClient.post<Bassin>('/bassins' + '/' + bassin.id, bassin, { observe: 'response' });
  }
}
