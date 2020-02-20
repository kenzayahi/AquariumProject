import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from "../../model/activity";
import {ActivityService} from "../activity.service";

@Component({
  selector: 'tr [activity]',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.css']
})
export class OneActivityComponent implements OnInit {

  @Input()
  activity: Activity;

  @Output()
  deleteActivity = new EventEmitter<Activity>();
  constructor(private activityService: ActivityService) { }

  ngOnInit() {
  }

  onDeleteActivity(id: any){
    this.activityService
      .deleteActivity(this.activity.id)
      .subscribe(
        data=> this.deleteActivity.emit(this.activity),
        error => {console.log(error);
        })
  }

}
