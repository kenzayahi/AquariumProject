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

  idEspece:number;

  especes:Array<Espece>;

  @Output()
  deleteBassin = new EventEmitter<Bassin>();

  @Output()
  affectespece = new EventEmitter<Boolean>();

  constructor(private bassinService: BassinService,private dialog:MatDialog,private especeService:EspeceService) { }

  ngOnInit() {
    this.onGetespeces();
  }

  onDeleteBassin(id: any){
    this.bassinService
      .deleteBassin(this.bassin.id)
      .subscribe(
        data=> this.deleteBassin.emit(this.bassin),
        error => {console.log(error);
        })
  }

  affectEspece(id:any) :void {
    const  dialogConfig  =  new  MatDialogConfig ( ) ;
    dialogConfig . disableClose  =  true ;
    dialogConfig . id  =  "composant modal" ;
    dialogConfig .height  =  "350 px" ;
    dialogConfig . width  =  "600px" ;
  const dialogRef = this.dialog.open(DialogOverviewComponent,{
    width:"350",height:"600",
    data:this.especes,
  });

  dialogRef.afterClosed().subscribe(result => {
  this.idEspece = result.data;
  this.bassinService
    .affecteEspece(id,this.idEspece)
    .subscribe(
      data=>{this.affectespece.emit(true),console.log(data)},
      error => {console.log("errrrrrror"+error)}
      );
});
}

  onGetespeces(){
     this.especeService
       .getEspeces()
       .subscribe(
         data=>{this.especes=data},
         error => {console.log("errrrrrror"+error);
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

