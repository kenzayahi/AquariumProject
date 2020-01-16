import { Component, OnInit } from '@angular/core';
import {AnimalService} from "./animal.service";
import {Animal} from "./animal";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  public animaux: Array<Animal>;

  constructor(private animalService:AnimalService) { }

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

}
