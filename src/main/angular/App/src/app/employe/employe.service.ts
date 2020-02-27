import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employe} from '../model/employe';
import {Bassin} from "../model/bassin";
import {Espece} from "../model/espece";


type EntityResponseType = HttpResponse<Employe>;

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private httpClient:HttpClient) { }

  getEmployes() : Observable<Array<Employe>> {
    return this.httpClient.get<Array<Employe>>('/employes');
  }
  getSimpleEmployes() : Observable<Array<Employe>> {
    return this.httpClient.get<Array<Employe>>('/simpleEmployes');
  }

  getEmploye(id: number) : Observable<Employe> {
    return this.httpClient.get<Employe>('/employes/' + id);
  }

  deleteEmploye(id: number): Observable<EntityResponseType> {
    return this.httpClient.delete<Employe>('/employes/' + id, { observe: 'response' });
  }
  createEmploye(employe:Employe): Observable<EntityResponseType> {
    return this.httpClient.post<Employe>('/employes', employe, { observe: 'response' });
  }

  updateEmploye(employe: Employe): Observable<EntityResponseType> {
    return this.httpClient.post<Employe>('/employes' + '/' + employe.id, employe, { observe: 'response' });
  }


  affecteBassin(idEmploye: number, idBassin: number) : Observable<Array<Employe>>{
    return this.httpClient.get<Array<Employe>>('/employesAddBassin/'+ idEmploye+'/'+idBassin);

  }

  deleteBassin(idEmploye: number, idBassin: number) : Observable<Array<Employe>>{
    return this.httpClient.get<Array<Employe>>('/employesRemoveBassin/'+ idEmploye+'/'+idBassin);

  }
}
