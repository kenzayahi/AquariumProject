import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from "../../../model/activity";

@Component({
  selector: 'tr [activityCalendrier]',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.css']
})
export class activityCalendrierComponent implements OnInit {
  @Input()
  activityCalendrier: Activity;

  @Output()
  deleteActivityInCalendrier = new EventEmitter<Activity>();
  constructor() { }

  ngOnInit() {
    console.log("une Activity"+activityCalendrierComponent);
  }

  onDeleteActivity(id: any) {
    this.deleteActivityInCalendrier.emit(this.activityCalendrier);
  }


}
