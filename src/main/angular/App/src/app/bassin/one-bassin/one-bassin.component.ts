import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bassin} from "../../model/bassin";
import {BassinService} from "../bassin.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogOverviewComponent} from "../dialog-overview/dialog-overview.component";
import {Espece} from "../../model/espece";
import {EspeceService} from "../../espece/espece.service";

@Component({
  selector: 'tr [bassin]',
  templateUrl: './one-bassin.component.html',
  styleUrls: ['./one-bassin.component.css']
})
export class OneBassinComponent implements OnInit {
  @Input()
  bassin: Bassin;
  @Input()
  role:any;
  @Output()
  deleteBassin = new EventEmitter<Bassin>();

  constructor(private bassinService: BassinService,private dialog:MatDialog,private especeService:EspeceService) { }

  ngOnInit() {
  }

  onDeleteBassin(id: any){
    this.bassinService
      .deleteBassin(this.bassin.id)
      .subscribe(
        data=> this.deleteBassin.emit(this.bassin),
        error => {console.log(error);
        })
  }

  afficher(especeList: Array<Espece>):string {
    let s : string = ""
    for(let i = 0; i < especeList.length; i++){
      s += especeList[i].nom ;
    }
    return s
  }

  nombreAnimaux(especeList: Array<Espece>) : number {
    let nombre: number = 0;
    for (let i = 0; i < especeList.length; i++) {
        nombre+=especeList[i].animalList.length
    }
    return nombre;
  }
}

