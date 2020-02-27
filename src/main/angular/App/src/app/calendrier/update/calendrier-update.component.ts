import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Calendrier} from "../../model/calendrier";
import {CalendrierService} from "../calendrier.service";
import {EmployeService} from "../../employe/employe.service";
import {Employe} from "../../model/employe";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ActivityService} from "../../activity/activity.service";
import {Activity} from "../../model/activity";
import {DialogCalendrierComponent} from "../dialog-overview/dialog-calendrier.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update',
  templateUrl: './calendrier-update.component.html',
  styleUrls: ['./calendrier-update.component.css']
})
export class CalendrierUpdateComponent implements OnInit {

  id:number;
  nom:string;
  formGroup: FormGroup;
  @Output()
  updateCalendrier=new EventEmitter<Calendrier>();
  @Output()
  affectactivity = new EventEmitter<Boolean>();

  private employes: Array<Employe>;
  private idEmployeConnecter: any;
  private activities: Array<Activity>;
  private idActivity: number;
  private listActivities: Array<Activity>;
  constructor(
    private calendrierService : CalendrierService,
    private route: ActivatedRoute,
    private employeService:EmployeService,
    private activityService:ActivityService,
    private router:Router,
    private dialog:MatDialog,
    private snackBar:MatSnackBar)
  {
  }

  ngOnInit() {
    this.onGetsimpleEmploye();
    this.onGetActivities();
    this.id = this.route.snapshot.params['id'];
    this.idEmployeConnecter = this.route.snapshot.params['idEmploye'];
    this.calendrierService.getEmployeFromCalendrier(this.id).subscribe(
      data2 => {
        this.calendrierService.getCalendrier(this.id).subscribe(data => {
          this.listActivities=data.activities;
            this.formGroup = new FormGroup({
              id: new FormControl(this.id),
              date: new FormControl(data.date),
              employe: new FormControl(data2.id),
            });
          }
        );
      });
      }
  onGetActivities() {
    this.activityService
      .getActivities()
      .subscribe(
        data => {this.activities = data
        },
        error => {console.log(error);
        });
  }
  onGetsimpleEmploye(){
    this.employeService
      .getSimpleEmployes()
      .subscribe(
        data=>{this.employes=data},
        error => {console.log(error);
        })
  }

  onUpdateCalendrier() {
    let calendrier: Calendrier =  this.formGroup.value;
    calendrier.id = this.id;
    calendrier.activities=this.listActivities;
    let idEmploye = this.formGroup.get('employe').value;
    calendrier.employe = null;
    this.calendrierService.updateCalendrier(calendrier,idEmploye).subscribe(
      data => {this.updateCalendrier.emit(calendrier)},
        error => console.log(error)
    );
  }

  reset(){
    this.formGroup.reset();
  }

  affectActivity(id: number) :void{
    const  dialogConfig  =  new  MatDialogConfig ( ) ;
    dialogConfig . disableClose  =  true ;
    dialogConfig . id  =  "composant modal" ;
    dialogConfig .height  =  "350 px" ;
    dialogConfig . width  =  "600px" ;
    const dialogRef = this.dialog.open(DialogCalendrierComponent,{
      width:"350",height:"600",
      data:this.activities,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.idActivity = result.data;
      this.calendrierService
        .affecteActivity(id, this.idActivity)
        .subscribe(
          data=>{this.affectactivity.emit(true);
            this.onGetActivities();
            this.refreshList();
          },
          error => {
            for(let a of this.listActivities){
              if(a.id==this.idActivity){
                this.snackBar.open("L'Activity choisie est déja affecter a ce calendrier","ok",{ verticalPosition: 'top' });
              }
            }
            console.log("errrrrrror"+error)}
        );
    });
  }

  refreshList(){
    this.calendrierService.getCalendrier(this.id).subscribe(data => {
        this.listActivities=data.activities;
      }
    );
  }
  deleteActivityCalendrier($event: Activity) {

    let activity = $event;
    this.calendrierService
      .deleteActivity(this.id, activity.id)
      .subscribe(
        data=> {
          this.onGetActivities();
          this.refreshList();

        },
        error => {console.log(error);
        })
  }
}
