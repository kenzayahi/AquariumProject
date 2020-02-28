import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Employe, RoleEmploye} from '../../model/employe';
import {EmployeService} from '../employe.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BassinService} from "../../bassin/bassin.service";
import {Bassin} from "../../model/bassin";
import {DialogOverviewEmployeComponent} from "../dialog-overview-employe/dialog-overview-employe.component";

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.css']
})
export class UpdateEmployeComponent implements OnInit {
  roleEmploye:[RoleEmploye.gestionnaire,RoleEmploye.simpleemploye,RoleEmploye.responsablebassin];
  id:number;
  idBassin : number;
  bassins:Array<Bassin>;

  @Output()
  affectebassin = new EventEmitter<Boolean>();

  formGroup: FormGroup;
  @Output()
  updateEmploye=new EventEmitter<Employe>();
  private listBassin: Array<Bassin>;
  constructor(private employeService : EmployeService,
              private dialog: MatDialog,
              private bassinService : BassinService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.onGetBassins();
    this.employeService.getEmploye(this.id).subscribe(data => {
      this.listBassin = data.bassinsresponsable;
      console.log("rooool"+data.roleEmploye);
        this.formGroup = new FormGroup({
          nom: new FormControl(data.nom),
          prenom: new FormControl(data.prenom),
          dateNaissance: new FormControl(data.dateNaissance),
          adress: new FormControl(data.adress),
          numSecurite: new FormControl(data.numSecurite),
          email:new FormControl(data.email),
          password:new FormControl(data.password),
          roleEmploye:new FormControl(data.roleEmploye),
        });
      }
    );
  }


  onUpdateEmploye() {
    console.log(this.listBassin.length);
    let employe: Employe =  this.formGroup.value;
    employe.id = this.id;
    if(this.listBassin.length!=0) {
      employe.roleEmploye=RoleEmploye.responsablebassin;
      this.employeService.updateEmploye(employe).subscribe(
        data => this.updateEmploye.emit(employe),
        error => console.log(error)
      );
    }else{
      employe.roleEmploye=RoleEmploye.simpleemploye;
      this.employeService.updateEmploye(employe).subscribe(
        data => this.updateEmploye.emit(employe),
        error => console.log(error)
      );
    }
  }

  affectBassin(id:any) :void {
    const  dialogConfig  =  new  MatDialogConfig ( ) ;
    dialogConfig . disableClose  =  true ;
    dialogConfig . id  =  "composant modal" ;
    dialogConfig .height  =  "350 px" ;
    dialogConfig . width  =  "600px" ;
    console.log(this.bassins);
    const dialogRef = this.dialog.open(DialogOverviewEmployeComponent,{
      width:"350",height:"600",
      data:this.bassins,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.idBassin = result.data;
      this.employeService
        .affecteBassin(id, this.idBassin)
        .subscribe(
          data=>{this.affectebassin.emit(true);
            this.onGetBassins();
            this.refreshList();
          },
          error => {console.log("errrrrrror"+error)}
        );
    });
  }

  private onGetBassins() {
    this.bassinService
      .getBassins()
      .subscribe(
        data=>{this.bassins=data},
        error => {console.log("errrrrrror"+error);
        })
  }

  private refreshList() {
    this.employeService.getEmploye(this.id).subscribe(data => {
        this.listBassin=data.bassinsresponsable;

      }
    );
  }

  deleteBassinInEmploye($event: any) {
    let bassin = $event;
    this.employeService
      .deleteBassin(this.id, bassin.id)
      .subscribe(
        data=> {

          this.onGetBassins();
          this.refreshList();

        },
        error => {console.log(error);
        })
  }

}
