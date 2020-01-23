import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-animal',
  templateUrl: './animal-edit.component.html',
})
export class AnimalEditComponent implements OnInit {
  listAnimaux:any;
//injecter le service httpClient
  especes: any;
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onCreateAnimal(animalForm:NgForm){
    console.log(animalForm);
    console.log(animalForm.submitted);
    console.log("$$$$$$$$$$$$$$$$fin************")
  }
  reset(animalForm:NgForm){
    animalForm.resetForm();
  }

  onGetespeces() {
    this.httpClient.get("http://localhost:8080/especes")
      .subscribe(data=>{
        this.especes=data;
      },error => {
        console.log("error")
      })
  }
}
