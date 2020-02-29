import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from "../../../model/activity";
import {Employe} from "../../../model/employe";

@Component({
  selector: 'tr [responsableActivity]',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.css']
})
export class activityResponsableComponent implements OnInit {
  @Input()
  responsableActivity: Employe;

  @Output()
  deleteResponsableInActivity = new EventEmitter<Employe>();
  constructor() { }

  ngOnInit() {
    console.log("roool"+this.responsableActivity.roleEmploye);
  }

  onDeleteActivity(id: any) {
    this.deleteResponsableInActivity.emit(this.responsableActivity);
  }


}
