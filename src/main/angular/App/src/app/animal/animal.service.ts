import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Animal} from "./animal";
@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient:HttpClient) { }


  getAnimaux() : Observable<Array<Animal>> {
    console.log("hey");
    return this.httpClient.get<Array<Animal>>('http://localhost:4200/animaux')

  }
}
