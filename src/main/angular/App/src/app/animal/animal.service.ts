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
    console.log("hey");
    return this.httpClient.get<Array<Animal>>('/animaux')
  }

  getEspeces() : Observable<Array<Espece>> {
    console.log("hey");
    return this.httpClient.get<Array<Espece>>('/especes')
  }

  getAnimal(id: number) : Observable<Animal> {
    return this.httpClient.get<Animal>('/animaux/' + id);
  }

  createAnimal(animal:Animal):Observable<Animal>{
    return this.httpClient.post<Animal>('/animaux',animal);

  }

  deleteAnimal(id: number): Observable<HttpResponse<Animal>> {
    return this.httpClient.delete<Animal>('/animaux/' + id, { observe: 'response' });
  }
  updateAnimal(animal: Animal): Observable<HttpResponse<Animal>> {
    return this.httpClient.post<Animal>('/animaux' + '/' + animal.id, animal, { observe: 'response' });
  }
}
