import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Espece} from "../../../model/espece";
import {EspeceService} from "../../../espece/espece.service";
import {MatDialog} from "@angular/material/dialog";
import {BassinService} from "../../bassin.service";

@Component({
  selector: 'tr [especeBassin]',
  templateUrl: './one-espece.component.html',
  styleUrls: ['./one-espece.component.css']
})
export class EspeceBassinComponent implements OnInit {
  @Input()
  especeBassin: Espece;

  @Output()
  deleteEspeceInBassin = new EventEmitter<Espece>();
  constructor(private bassinService: BassinService,private dialog:MatDialog) { }

  ngOnInit() {
  }

  onDeleteEspece(id: any){
    this.bassinService
      .deleteEspece(id,this.especeBassin.id)
      .subscribe(
        data=> this.deleteEspeceInBassin.emit(this.especeBassin),
        error => {console.log(error);
        })
  }

}
