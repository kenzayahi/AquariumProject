import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecteurService} from "../secteur.service";
import {Secteur} from "../../model/secteur";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'tr [secteur]',
  templateUrl: './one-secteur.component.html',
  styleUrls: ['./one-secteur.component.css']
})
export class OneSecteurComponent implements OnInit {

  @Input()
  secteur: Secteur;

  @Output()
  deleteSecteur = new EventEmitter<Secteur>();
  @Output()
  addBassin=new EventEmitter<Secteur>();

  listBassin: any;
  formGroup: FormGroup;
  constructor(private secteurService: SecteurService) {
    this.listBassin=this.onGetBassins();
  }

  ngOnInit() {
  }

  onDeleteSecteur(id: any){
    this.secteurService
      .deleteSecteur(this.secteur.id)
      .subscribe(
        data=> this.deleteSecteur.emit(this.secteur),
        error => {console.log(error);
        })
  }
  onGetBassins(){
    this.secteurService
      .getBassins()
      .subscribe(
        data=>{this.listBassin=data;},
        error => {console.log(error);
        })
  }

  onAddBassin(idsecteur: number,idBassin:number) {
    this.secteurService.addBassin(idsecteur,idBassin);
    this.secteurService
        .getSecteur(idsecteur)
        .subscribe(
        data=> {this.addBassin.emit(data);console.log("add bassin",data)},
        error => {console.log(error);
        })

  }
}
