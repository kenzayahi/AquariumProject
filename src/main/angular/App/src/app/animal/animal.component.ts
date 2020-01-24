import { Component, OnInit } from '@angular/core';
import {AnimalService} from "./animal.service";
import {Animal} from "./animal";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  constructor(private animalService:AnimalService) { }

  listAnimaux:any;

  ngOnInit() {
  }
  onGetanimaux(){
    console.log("bbbbbbb");

    this.animalService.getAnimaux().subscribe(data=>{
      console.log("hhhhhhhhhh");
        this.animaux=data;
        console.log(data);
        console.log("finish")
    },error => {
      console.log(error);
    })
  }

  onGetAnimaux() {
    this.httpClient.get("http://localhost:8080/animaux")
      .subscribe(data=>{
        this.listAnimaux=data;
      },error => {
        console.log("error")
      })
  }
}
