import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Activity, TypeActivity} from "../../model/activity";
import {Employe} from "../../model/employe";
import {ActivityService} from "../activity.service";
import {EmployeService} from "../../employe/employe.service";
import {DialogActivityComponent} from "../dialog-activity/dialog-activity.component";
import {BassinService} from "../../bassin/bassin.service";
import {Bassin} from "../../model/bassin";

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent implements OnInit {

  type=[ TypeActivity.bilan_veterinaire,TypeActivity.entretien,TypeActivity.nourrissage,TypeActivity.verifier_stock_nouriture];
  id:number;
  formGroup: FormGroup;
  listResponsables:Array<Employe>;
  @Output()
  updateActivity=new EventEmitter<Activity>();
  idEmploye:number;
  employes:Array<Employe>;
  @Output()
  deleteActivity = new EventEmitter<Activity>();
  @Output()
  affectEmploye = new EventEmitter<Boolean>();

  typeActivity:TypeActivity;
  private bassins: Array<Bassin>;


  constructor(private activityService : ActivityService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private employeService:EmployeService,
              private bassinService:BassinService) {
    this.onGetBassins();
  }

  refreshList(){
    this.activityService.getActivity(this.id).subscribe(data => {
        this.listResponsables=data.responsables;
      }
    );
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.activityService.getBassinFromActivity(this.id).subscribe(

      data2 => {
        console.log("data2"+data2.id);
        this.activityService.getActivity(this.id).subscribe(data => {
            this.listResponsables=data.responsables;
            this.typeActivity=data.type;
            this.formGroup = new FormGroup({
              type: new FormControl(data.type),
              dateDebut: new FormControl(new Date(data.dateDebut).toISOString().substring(0,10)),
              dateFin: new FormControl(new Date(data.dateFin).toISOString().substring(0,10)),
              accessible: new FormControl(data.accessible),
              bassin:new FormControl(data2.id),
            });
            if(this.typeActivity==TypeActivity.verifier_stock_nouriture){
              this.onGetGestionnaire()
            }else{
              this.onGetSimpleEmploye()
            }
          }
        );
      });
  }

  onUpdateActivity() {
    let activity: Activity =  this.formGroup.value;
    activity.id = this.id;
    let idBassin = this.formGroup.get('bassin').value;
    activity.bassin = null;
    activity.responsables=this.listResponsables;
    this.activityService.updateActivity(activity,idBassin).subscribe(
      data => this.updateActivity.emit(activity),
      error => console.log(error)
    );

  }
  onGetSimpleEmploye(){
    this.employeService
      .getSimpleEmployes()
      .subscribe(
        data=>{this.employes=data},
        error => {console.log("errrrrrror"+error);
        })
  }
  onGetGestionnaire(){
    this.employeService
      .getGestionnaireEmployes()
      .subscribe(
        data=>{this.employes=data},
        error => {console.log("errrrrrror"+error);
        })
  }
  onGetBassins(){
    this.bassinService
      .getBassins()
      .subscribe(
        data=>{this.bassins=data;},
        error => {console.log(error);
        })
  }
  affecterEmploye(id:any) :void {
    const  dialogConfig  =  new  MatDialogConfig ( ) ;
    dialogConfig . disableClose  =  true ;
    dialogConfig . id  =  "composant modal" ;
    dialogConfig .height  =  "350 px" ;
    dialogConfig . width  =  "600px" ;
    const dialogRef = this.dialog.open(DialogActivityComponent,{
      width:"350",height:"600",
      data:this.employes,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.idEmploye = result.data;
      this.activityService
        .affecteEmploye(id, this.idEmploye)
        .subscribe(
          data=>{this.affectEmploye.emit(true);
            if(this.typeActivity==TypeActivity.verifier_stock_nouriture){
              this.onGetGestionnaire()
            }else{
              this.onGetSimpleEmploye()
            }
            this.refreshList();
          },
          error => {console.log("errrrrrror"+error)}
        );
    });
  }

  deleteEmployeActivity($event: Employe) {

    let employe = $event;
    this.activityService
      .deleteEmploye(this.id,employe.id)
      .subscribe(
        data=> {
          if(this.typeActivity==TypeActivity.verifier_stock_nouriture){
            this.onGetGestionnaire()
          }else{
            this.onGetSimpleEmploye()
          }
          this.refreshList();

        },
        error => {console.log(error);
        })
  }

}
