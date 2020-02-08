import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Espece} from "../../model/espece";
import {EspeceService} from "../espece.service";

@Component({
  selector: 'tr [espece]',
  templateUrl: './one-espece.component.html',
  styleUrls: ['./one-espece.component.css']
})
export class OneEspeceComponent implements OnInit {
  @Input()
  espece: Espece;

  @Output()
  deleteEspece = new EventEmitter<Espece>();
  constructor(private especeService: EspeceService) { }



  ngOnInit() {
  }



  onDeleteEspece(id: any){
    this.especeService
      .deleteEspece(this.espece.id)
      .subscribe(
        data=> this.deleteEspece.emit(this.espece),
        error => {console.log(error);
        })
  }

}
