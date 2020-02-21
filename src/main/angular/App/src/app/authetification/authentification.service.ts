import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Authentification} from "../model/authentification";
import {Employe} from "../model/employe";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  constructor(private httpClient:HttpClient) { }

  authentificate(authentication:Authentification) : Observable<Employe> {
    return this.httpClient.get<Employe>('/authentificate'+'/'+authentication.login+'/'+authentication.password);
  }
}
