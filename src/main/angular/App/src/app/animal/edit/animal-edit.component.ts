import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnimalService} from "../animal.service";
import {Espece} from '../../model/espece';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Animal, Sexe} from '../../model/animal';

@Component({
  selector: 'app-animal',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css']

})
export class AnimalEditComponent implements OnInit {
  formGroup: FormGroup;
  sexe=[ Sexe.femmelle,Sexe.male];


  @Output()
  createAnimal= new EventEmitter<Animal>();

  especes: any;
  constructor(
    private formBuilder: FormBuilder,
    private animalService:AnimalService,
    protected snackBar: MatSnackBar,
    protected router:Router,
  ) {
    this.onGetespeces();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'nom': [null, Validators.required],
      'sexe': [null, Validators.required],
      'espece': [null, Validators.required],
      'signedistinctif': [null, Validators.required],
      'dateArrivee':[null, Validators.required],
      'dateDepart':[null, Validators.required],
    });
  }
  onCreateAnimal(){
    let animal : Animal = this.formGroup.value;
    let idEspece = animal.espece.id;
    animal.espece = null;
    this.animalService
        .createAnimal(animal, idEspece)
        .subscribe(
          data=>{this.createAnimal.emit(animal);
                       this.snackBar.open('L"animal a bien été créer','OK',{verticalPosition:'top'});
                       this.router.navigate(['/animal'])},
          error=>{this.snackBar.open('Error :'+error.toString(),'OK',{verticalPosition:'top'});
                        console.log(error)}
  );
  }

  reset(){
    this.formGroup.reset();
  }

  onGetespeces(){
    this.animalService
      .getEspeces()
      .subscribe(
        data=>{this.especes=data;},
        error => {console.log(error);
        })
  }
}

