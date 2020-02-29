import {Component, OnInit} from '@angular/core';
import {AnimalService} from "./animal.service";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  constructor(private animalService:AnimalService) { }

  listAnimaux:any;

  ngOnInit() {
    this.onGetanimaux()
  }
  onGetanimaux(){
    this.animalService
        .getAnimaux()
        .subscribe(
          data=>{this.listAnimaux=data;},
            error => {console.log(error);
    })
  }

  refresh($event:any) {
    this.animalService.getAnimaux().subscribe(
      data => this.listAnimaux = data)



  }
}
