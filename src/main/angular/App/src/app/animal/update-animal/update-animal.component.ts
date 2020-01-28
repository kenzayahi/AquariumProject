import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Animal, Sexe} from '../animal';
import {AnimalService} from '../animal.service';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrls: ['./update-animal.component.css']
})
export class UpdateAnimalComponent implements OnInit {

  sexe=[ Sexe.femmelle,Sexe.male];

  id:number;
  formGroup: FormGroup;
  especes: any;
  @Output()
  updateAnimal=new EventEmitter<Animal>();
  constructor(
    private animalService : AnimalService,
    private route: ActivatedRoute)
  {
    this.especes = this.onGetespeces();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.animalService.getAnimal(this.id).subscribe(data => {

        this.formGroup = new FormGroup({
          nom: new FormControl(data.nom),
          sexe: new FormControl(data.sexe),
          dateArrivee: new FormControl(data.dateArrivee),
          dateDepart: new FormControl(data.dateDepart),
          signedistinctif: new FormControl(data.signedistinctif),
          espece: new FormControl(data.espece.nom),

        });
      }
    );
  }

  onUpdateAnimal() {
    let animal: Animal =  this.formGroup.value;
    animal.id = this.id;
    this.animalService.updateAnimal(animal).subscribe(
      data => this.updateAnimal.emit(animal),
      error => console.log(error)
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