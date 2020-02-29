import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Animal} from "../model/animal";
import {Espece} from "../model/espece";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient:HttpClient) { }


  getAnimaux() : Observable<Array<Animal>> {
    return this.httpClient.get<Array<Animal>>('/animaux')
  }

  getEspeces() : Observable<Array<Espece>> {
    return this.httpClient.get<Array<Espece>>('/especes')
  }

  getAnimal(id: number) : Observable<Animal> {
    return this.httpClient.get<Animal>('/animaux/' + id);
  }
  getEspeceFromAnimal(id: number) : Observable<Espece> {
    return this.httpClient.get<Espece>('/animaux_get_espece/' + id);
  }
  createAnimal(animal:Animal, idEspece : number):Observable<Animal>{
    return this.httpClient.post<Animal>('/animaux/' + idEspece,animal);

  }
  deleteAnimal(id: number): Observable<HttpResponse<Animal>> {
    return this.httpClient.delete<Animal>('/animaux/' + id, { observe: 'response' });
  }

 updateAnimal(animal: Animal, idEspece : number): Observable<HttpResponse<Animal>> {
  return this.httpClient.post<Animal>('/animaux' + '/' + animal.id + '/' + idEspece, animal, { observe: 'response' });
}

}
