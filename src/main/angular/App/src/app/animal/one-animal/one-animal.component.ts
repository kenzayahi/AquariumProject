import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Animal} from '../animal';
import {AnimalService} from '../animal.service';

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
