import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Activity, TypeActivity} from "../../model/activity";
import {Employe} from "../../model/employe";
import {ActivityService} from "../activity.service";
import {EmployeService} from "../../employe/employe.service";
import {DialogActivityComponent} from "../dialog-activity/dialog-activity.component";

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent implements OnInit {

  type=[ TypeActivity.bilan,TypeActivity.entretien,TypeActivity.nourrissage];
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


  constructor(private activityService : ActivityService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private employeService:EmployeService) { }
  refreshList(){
    this.activityService.getActivity(this.id).subscribe(data => {
        this.listResponsables=data.responsables;
      }
    );
  }

  ngOnInit() {
    this.onGetEmploye();
    this.id = this.route.snapshot.params['id'];
    this.activityService.getActivity(this.id).subscribe(data => {
        this.listResponsables=data.responsables;
        this.formGroup = new FormGroup({
          type: new FormControl(data.type),
          dateDebut: new FormControl(data.dateDebut),
          dateFin: new FormControl(data.dateFin),
          accessible: new FormControl(data.accessible),
        });
      }
    );
  }

  onUpdateActivity() {
    let activity: Activity =  this.formGroup.value;
    activity.id = this.id;
    activity.responsables=this.listResponsables;
    this.activityService.updateActivity(activity).subscribe(
      data => this.updateActivity.emit(activity),
      error => console.log(error)
    );

  }
  onGetEmploye(){
    this.employeService
      .getSimpleEmployes()
      .subscribe(
        data=>{this.employes=data},
        error => {console.log("errrrrrror"+error);
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
            this.onGetEmploye();
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
          this.onGetEmploye();
          this.refreshList();

        },
        error => {console.log(error);
        })
  }

}
