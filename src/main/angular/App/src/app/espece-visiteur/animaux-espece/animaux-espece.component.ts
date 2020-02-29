import { Component, OnInit } from '@angular/core';
import {Bassin} from "../../model/bassin";
import {SecteurService} from "../../secteur/secteur.service";
import {ActivatedRoute} from "@angular/router";
import {Espece} from "../../model/espece";
import {Animal} from "../../model/animal";
import {EspeceService} from "../../espece/espece.service";

@Component({
  selector: 'app-animaux-espece',
  templateUrl: './animaux-espece.component.html',
  styleUrls: ['./animaux-espece.component.css']
})
export class AnimauxEspeceComponent implements OnInit {
  idEspece:number;
  espece:Espece;
  listAnimaux:Array<Animal>
  constructor(private especeService : EspeceService,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.idEspece = this.route.snapshot.params['id'];
    this.especeService.getEspece(this.idEspece).subscribe(data => {
        this.espece=data;
        this.getAnimaux(this.espece);
      }
    );
  }
  getAnimaux(espece:Espece){
    let sum=0;
        if(sum==0 ||espece.animalList){
          this.listAnimaux=espece.animalList;
          sum+=1;
        }else if(espece.animalList){
          this.listAnimaux=this.listAnimaux.concat(espece.animalList);
          sum+=1;
        }

  }
}
