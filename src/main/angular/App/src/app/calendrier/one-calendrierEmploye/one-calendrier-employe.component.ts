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
  selector: 'tr [calendrierEmploye]',
  templateUrl: './one-calendrier-employe.component.html',
  styleUrls: ['./one-calendrier-employe.component.css']
})
export class OneCalendrierEmployeComponent implements OnInit {

  @Input()
  calendrierEmploye: Calendrier;
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
        if (this.role == RoleEmploye.responsableBassin) {
          this.isResponsable = true;
        } else if (this.role == RoleEmploye.simpleEmploye) {
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
      .deleteCalendrier(this.calendrierEmploye.id)
      .subscribe(
        data=> this.deleteCalendrier.emit(this.calendrierEmploye),
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
