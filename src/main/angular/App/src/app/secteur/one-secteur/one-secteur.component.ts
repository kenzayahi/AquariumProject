import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecteurService} from "../secteur.service";
import {Secteur} from "../../model/secteur";
import {FormGroup} from "@angular/forms";
import {Bassin} from "../../model/bassin";

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

  formGroup: FormGroup;
  private hasBassin: boolean;
  constructor(private secteurService: SecteurService,private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
     if(this.secteur.bassinList.length!=0){
       this.hasBassin=false;
     }else{
       this.hasBassin=true;
     }
  }

  onDeleteSecteur(id: any){
    this.secteurService
      .deleteSecteur(this.secteur.id)
      .subscribe(
        data=> this.deleteSecteur.emit(this.secteur),
        error => {console.log(error);
        })
  }


  afficher(bassinList: Array<Bassin>):string {
    let s : string = "";
    if(bassinList.length !== 0){
      for(let i = 0; i < bassinList.length; i++){
        this.hasBassin=true;
        this.ref.markForCheck();
        s += bassinList[i].numBassin ;
        if(i != bassinList.length - 1)
          s+= "/ " ;
      }
    }else{
      this.hasBassin=false;
      this.ref.markForCheck();
      s="Affecter un Bassin";
    }
    return s
  }
}
