import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SecteurService} from "./secteur.service";
import {Secteur} from "./secteur";

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.css']
})
export class SecteurComponent implements OnInit {

  constructor(private secteurService:SecteurService) { }

  listSecteurs:any;

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

  refreshBassin($event: Secteur) {
    console.log("refffffrech",$event);
    this.secteurService.getSecteurs().subscribe(
      data => {this.listSecteurs = data;
               console.log(data)});

  }
}
