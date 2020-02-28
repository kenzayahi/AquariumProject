import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Calendrier} from '../../model/calendrier';
import {CalendrierService} from '../calendrier.service';
import {ActivityService} from '../../activity/activity.service';
import {Activity} from '../../model/activity';
import {RoleEmploye} from "../../model/employe";
import {ActivatedRoute} from "@angular/router";
import {EmployeService} from "../../employe/employe.service";

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
  idEmploye: any;
  employe: any;
  isResponsable:boolean;
  isSimpleEmploye:boolean;

  constructor(private calendrierService: CalendrierService,
              private dialog:MatDialog,
              private activityService:ActivityService,
              private route:ActivatedRoute,
              private employeService:EmployeService
              ) { }

  ngOnInit() {
      this.init();
  }
  // noinspection DuplicatedCode
  init() {
    this.idEmploye = this.route.snapshot.params['idEmploye'];
    this.employe = this.employeService.getEmploye(this.idEmploye).subscribe(
      data => {
        this.employe = data;
        this.role = this.employe.roleEmploye;
        if (this.role == RoleEmploye.responsablebassin) {
          this.isResponsable = true;
        } else if (this.role == RoleEmploye.simpleemploye) {
          this.isSimpleEmploye = true;
        }
      },
      error => {
        console.log(error);
      }
    );
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
