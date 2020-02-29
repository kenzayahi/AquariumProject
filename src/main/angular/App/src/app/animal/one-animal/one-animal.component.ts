import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Animal} from '../../model/animal';
import {AnimalService} from '../animal.service';
import {EspeceService} from "../../espece/espece.service";

@Component({
  selector: 'tr [animal]',
  templateUrl: './one-animal.component.html',
})
export class OneAnimalComponent implements OnInit {
  @Input()
  animal: Animal;

  @Output()
  deleteAnimal = new EventEmitter<Animal>();
  constructor(private animalService: AnimalService) { }



  ngOnInit() {
    this.animalService.getEspeceFromAnimal(this.animal.id).subscribe(
      data => this.animal.espece = data
    )
  }



  onDeleteAnimal(id: any){
    this.animalService
      .deleteAnimal(this.animal.id)
      .subscribe(
        data=> this.deleteAnimal.emit(this.animal),
        error => {console.log(error);
        })
  }

}
