import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employe} from '../model/employe';


type EntityResponseType = HttpResponse<Employe>;

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private httpClient:HttpClient) { }

  getEmployes() : Observable<Array<Employe>> {
    return this.httpClient.get<Array<Employe>>('/employes');
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
}
