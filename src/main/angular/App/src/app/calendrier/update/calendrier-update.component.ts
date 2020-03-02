import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Calendrier} from "../../model/calendrier";
import {CalendrierService} from "../calendrier.service";
import {EmployeService} from "../../employe/employe.service";
import {ActivityService} from "../../activity/activity.service";
import {Activity} from "../../model/activity";

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

  idEmployeConnecter: any;
  activities: Array<Activity>;
  listActivities: Array<Activity>;

  constructor(
    private calendrierService : CalendrierService,
    private route: ActivatedRoute,
    protected router: Router,
    private employeService:EmployeService,
    private activityService:ActivityService)
  {
  }

  ngOnInit() {
    this.onGetActivities();
    this.id = this.route.snapshot.params['id'];
    this.idEmployeConnecter = this.route.snapshot.params['idEmploye'];
        this.calendrierService.getCalendrier(this.id).subscribe(data => {
          this.listActivities=data.activities;
            this.formGroup = new FormGroup({
              id: new FormControl(this.id),
              numSemaine: new FormControl(data.numSemaine),
            });
          }
        );
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

  onUpdateCalendrier() {
    let calendrier: Calendrier =  this.formGroup.value;
    calendrier.id = this.id;
    calendrier.activities=this.listActivities;
    this.calendrierService.updateCalendrier(calendrier).subscribe(
      data => {this.updateCalendrier.emit(calendrier);
        this.router.navigate(['/calendrier/' + this.idEmployeConnecter])
      },
        error => console.log(error)
    );
  }

  reset(){
    this.formGroup.reset();
  }
}
