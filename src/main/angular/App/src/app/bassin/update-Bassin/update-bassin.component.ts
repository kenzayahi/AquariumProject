import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Bassin, Etat} from "../../model/bassin";
import {BassinService} from "../bassin.service";
import {Espece} from "../../model/espece";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogOverviewComponent} from "../dialog-overview/dialog-overview.component";
import {EspeceService} from "../../espece/espece.service";

@Component({
  selector: 'app-update-bassin',
  templateUrl: './update-bassin.component.html',
  styleUrls: ['./update-bassin.component.css']
})
export class UpdateBassinComponent implements OnInit {
  etat=[ Etat.propre,Etat.sale];
  id:number;
  formGroup: FormGroup;
  listEspece:Array<Espece>;
  @Output()
  updateBassin=new EventEmitter<Bassin>();
  private role: string;
  idEspece:number;
  especes:Array<Espece>;
  @Output()
  deleteBassin = new EventEmitter<Bassin>();
  @Output()
  affectespece = new EventEmitter<Boolean>();


  constructor(private bassinService : BassinService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private especeService:EspeceService) { }

  ngOnInit() {
    this.onGetespeces();
    this.id = this.route.snapshot.params['id'];
    this.role = this.route.snapshot.params['role'];
    this.bassinService.getBassin(this.id).subscribe(data => {
        this.listEspece=data.especeList;
        this.formGroup = new FormGroup({
          numBassin: new FormControl(data.numBassin),
          volumeEau: new FormControl(data.volumeEau),
          capaciteMax: new FormControl(data.capaciteMax),
          etat: new FormControl(data.etat),
        });
      }
    );
  }


  onUpdateBassin() {
    let bassin: Bassin =  this.formGroup.value;
    bassin.id = this.id;
    bassin.especeList=this.listEspece;
    this.bassinService.updateBassin(bassin).subscribe(
      data => this.updateBassin.emit(bassin),
      error => console.log(error)
    );

  }
  onGetespeces(){
    this.especeService
      .getEspeces()
      .subscribe(
        data=>{this.especes=data},
        error => {console.log("errrrrrror"+error);
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
          data=>{this.affectespece.emit(true);
                       this.onGetespeces()},
          error => {console.log("errrrrrror"+error)}
        );
    });
  }

  deleteEspeceBassin($event: Espece) {
    this.onGetespeces();

  }
}
