import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Activity} from "../model/activity";
import {ActivityService} from "./activity.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {


  constructor(private activityService: ActivityService) { }

  listActivity: any;

  @Output()
  updateActivity = new EventEmitter<Activity>();

  ngOnInit() {
    this.onGetActivity();
  }
  onGetActivity() {
    this.activityService
      .getActivities()
      .subscribe(
        data => {this.listActivity = data;
        },
        error => {console.log(error);
        });
  }

  refresh($event: any) {
    this.activityService.getActivities().subscribe(
      data => this.listActivity = data);
  }

}
