import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Animal, Sexe} from '../../model/animal';
import {AnimalService} from '../animal.service';
import {Espece} from "../../model/espece";

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrls: ['./update-animal.component.css']
})
export class UpdateAnimalComponent implements OnInit {

  sexe=[ Sexe.femmelle,Sexe.male];

  id:number;
  nom:string;
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

    this.animalService.getEspeceFromAnimal(this.id).subscribe(

      data2 => {


        this.animalService.getAnimal(this.id).subscribe(data => {
              this.formGroup = new FormGroup({
               id: new FormControl(this.id),
                nom: new FormControl(data.nom),
                sexe: new FormControl(data.sexe),
                dateArrivee: new FormControl(new Date(data.dateArrivee).toISOString().substring(0,10)),
                dateDepart: new FormControl(new Date(data.dateDepart).toISOString().substring(0,10)),
                signedistinctif: new FormControl(data.signedistinctif),
                espece: new FormControl(data2.id)


              });
              this.nom = data.nom;
          }
        );
      }
    )


  }

  onUpdateAnimal() {
    let animal: Animal =  this.formGroup.value;
    animal.id = this.id;
    let idEspece = this.formGroup.get('espece').value;
          animal.espece = null;
        this.animalService.updateAnimal(animal, idEspece).subscribe(
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
