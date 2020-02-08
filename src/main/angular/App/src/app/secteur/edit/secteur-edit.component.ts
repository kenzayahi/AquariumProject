import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Secteur} from "../secteur";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecteurService} from "../secteur.service";

@Component({
  selector: 'app-edit',
  templateUrl: './secteur-edit.component.html',
  styleUrls: ['./secteur-edit.component.css']
})
export class SecteurEditComponent implements OnInit {
  formGroup: FormGroup;

  @Output()
  createSecteur= new EventEmitter<Secteur>();

  constructor(private formBuilder: FormBuilder,
              private secteurService:SecteurService,
              protected router: Router,
              protected snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'nom': [null, Validators.required],
      'localisation': [null, Validators.required],
      'bassinList': [null, Validators.required],
    });
  }
  onCreateSecteur(){
    this.secteurService
      .createSecteur(this.formGroup.value)
      .subscribe(
        data=>{this.createSecteur.emit(this.formGroup.value);
          this.snackBar.open('Le Secteur a bien été créer', 'OK', { verticalPosition: 'top' });
          this.router.navigate(['/secteur'])},
        error=>console.log(error)
      );
  }

  reset(){
    this.formGroup.reset();
  }

}
