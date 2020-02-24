import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Calendrier} from '../../model/calendrier';
import {CalendrierService} from '../calendrier.service';
import {ActivityService} from '../../activity/activity.service';
import {Activity} from '../../model/activity';

@Component({
  selector: 'tr [calendrier]',
  templateUrl: './one-calendrier.component.html',
  styleUrls: ['./one-calendrier.component.css']
})
export class OneCalendrierComponent implements OnInit {

  @Input()
  calendrier: Calendrier;
  @Input()
  role:any;
  @Output()
  deleteCalendrier = new EventEmitter<Calendrier>();

  constructor(private calendrierService: CalendrierService,private dialog:MatDialog,private activityService:ActivityService) { }

  ngOnInit() {
  }

  onDeleteCalendrier(id: any){
    this.calendrierService
      .deleteCalendrier(this.calendrier.id)
      .subscribe(
        data=> this.deleteCalendrier.emit(this.calendrier),
        error => {console.log(error);
        })
  }

  afficher(activityList: Array<Activity>):string {
    let s : string = ""
    for(let i = 0; i < activityList.length; i++){
      s += activityList[i].type ;
      if(i != activityList.length - 1)
        s+= "/ " ;
    }
    return s
  }
}
