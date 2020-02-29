import { Component, OnInit } from '@angular/core';
import {Bassin} from "../../model/bassin";
import {SecteurService} from "../../secteur/secteur.service";
import {ActivatedRoute} from "@angular/router";
import {Espece} from "../../model/espece";
import {Animal} from "../../model/animal";

@Component({
  selector: 'app-animaux-visit',
  templateUrl: './animaux-visit.component.html',
  styleUrls: ['./animaux-visit.component.css']
})
export class AnimauxVisitComponent implements OnInit {
  idSecteur:number;
  listBassin: Array<Bassin>;
  listEspece:Array<Espece>;
  listAnimaux:Array<Animal>
  constructor(private secteurService : SecteurService,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.idSecteur = this.route.snapshot.params['id'];
    this.secteurService.getSecteur(this.idSecteur).subscribe(data => {
        this.listBassin=data.bassinList;
        this.getAnimaux(this.listBassin);
      }
    );
  }
  getAnimaux(listBassin:Array<Bassin>){
    let sum=0;
    for(let bassin of listBassin){
      this.listEspece=bassin.especeList;
      for(let espece of this.listEspece){
        if(sum==0 ||espece.animalList){
          this.listAnimaux=espece.animalList;
          sum+=1;
        }else if(espece.animalList){
          this.listAnimaux=this.listAnimaux.concat(espece.animalList);
          sum+=1;
        }
      }
    }
  }
}
