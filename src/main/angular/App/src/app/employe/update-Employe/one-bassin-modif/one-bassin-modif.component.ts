import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bassin} from "../../../model/bassin";

@Component({
  selector: 'tr [bassinEmployes]',
  templateUrl: './one-bassin-modif.component.html',
  styleUrls: ['./one-bassin-modif.component.css']
})
export class OneBassinModifComponent implements OnInit {


  @Input()
  bassinEmployes : Bassin;

  @Output()
  deleteBassinInEmploye = new EventEmitter<Bassin>();


  constructor() { }

  ngOnInit() {
    console.log("test")
  }

  onDeleteBassin(id: any) {
    this.deleteBassinInEmploye.emit(this.bassinEmployes);
  }
}
