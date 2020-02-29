import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SecteurService} from "../secteur/secteur.service";
import {Secteur} from "../model/secteur";
import {Bassin} from "../model/bassin";
import {Espece} from "../model/espece";

@Component({
  selector: 'app-secteur-visit',
  templateUrl: './secteur-visit.component.html',
  styleUrls: ['./secteur-visit.component.css']
})
export class SecteurVisitComponent implements OnInit {

  constructor(private secteurService:SecteurService) { }

  listSecteurs:Array<Secteur>;
  listEspece:Array<Espece>;

  @Output()
  updateSecteur = new EventEmitter<Secteur>();

  ngOnInit() {
    this.onGetSecteurs()
  }
  onGetSecteurs(){
    this.secteurService
      .getSecteurs()
      .subscribe(
        data=>{this.listSecteurs=data;console.log(data)},
        error => {console.log(error);
        })
  }

  refresh($event: any) {
    this.secteurService.getSecteurs().subscribe(
      data => this.listSecteurs = data
    );


  }

  getNombreAnimaux(bassinList: Array<Bassin>):number {
    let nombreAnimaux=0
      for(let bassin of bassinList){
        this.listEspece=bassin.especeList;
          for(let espece of this.listEspece){
            nombreAnimaux+=espece.animalList.length;
          }
      }
      return nombreAnimaux;
  }
}
