import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Activity, TypeActivity} from "../../model/activity";
import {ActivityService} from "../activity.service";
import {Employe} from "../../model/employe";

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent implements OnInit {

  type=[ TypeActivity.bilan,TypeActivity.entretien,TypeActivity.nourrissage];
  id:number;
  formGroup: FormGroup;
  @Output()
  updateActivity=new EventEmitter<Activity>();
  private responsable: Employe;
  constructor(private activityService : ActivityService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.activityService.getActivity(this.id).subscribe(data => {

        this.formGroup = new FormGroup({
          type: new FormControl(data.type),
          dateDebut: new FormControl(data.dateDebut),
          dateFin : new FormControl(data.dateFin),
          responsable : new FormControl(data.responsable.nom),
          accessible: new FormControl(data.accessible)
        }),
          this.responsable = data.responsable;
          // tslint:disable-next-line:no-unused-expression
        this.formGroup.get('responsable').disabled;
      }
    );
  }

  onUpdateActivity() {
    let activity: Activity =  this.formGroup.value;
    let idResponsable = this.responsable.id;
    activity.responsable = null;
    activity.id = this.id;
    this.activityService.updateActivity(activity, idResponsable).subscribe(
      data => this.updateActivity.emit(activity),
      error => console.log(error)
    );

  }

}