import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Secteur} from "../secteur";
import {SecteurService} from "../secteur.service";

@Component({
  selector: 'app-update-secteur',
  templateUrl: './update-secteur.component.html',
  styleUrls: ['./update-secteur.component.css']
})
export class UpdateSecteurComponent implements OnInit {

  id:number;
  formGroup: FormGroup;
  @Output()
  updateSecteur=new EventEmitter<Secteur>();
  constructor(private secteurService : SecteurService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.secteurService.getSecteur(this.id).subscribe(data => {

        this.formGroup = new FormGroup({
          nom: new FormControl(data.nom),
          localisation: new FormControl(data.localisation),
          bassinList: new FormControl(data.bassinList),
        });
      }
    );
  }
  onUpdateEspece() {
    let secteur: Secteur =  this.formGroup.value;
    secteur.id = this.id;
    this.secteurService.updateSecteur(secteur).subscribe(
      data => this.updateSecteur.emit(secteur),
      error => console.log(error)
    );

  }
}
