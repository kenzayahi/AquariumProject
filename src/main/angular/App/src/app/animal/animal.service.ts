import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Animal} from "./animal";
import {Espece} from "../espece/espece";
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

  createAnimal(animal:Animal):Observable<Animal>{
    return this.httpClient.post<Animal>('/animaux',animal);

  }

}
