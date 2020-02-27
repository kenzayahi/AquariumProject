import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoleEmploye} from '../model/employe';
import {CalendrierService} from './calendrier.service';
import {Calendrier} from '../model/calendrier';
import {EmployeService} from "../employe/employe.service";

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  employe:any;
  role: any;
  idEmploye:number;

  constructor(private calendrierService: CalendrierService,
              private route:ActivatedRoute,
              private employeService:EmployeService) { }

  listCalendrier:any;
  employeCalendrier:any;
  isResponsable=false;
  isSimpleEmploye=false;


  @Output()
  updateCalendrier = new EventEmitter<Calendrier>();

  ngOnInit() {
    this.init();
    this.onGetCalendrier();
    this.onGetEmployeCalendrier();
  }
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
  onGetCalendrier(){
    this.calendrierService
      .getcalendriers()
      .subscribe(
        data=>{this.listCalendrier=data},
        error => {console.log(error);
        })
  }
  onGetEmployeCalendrier(){
    this.calendrierService
      .getEmployecalendriers(this.idEmploye)
      .subscribe(
        data=>{this.employeCalendrier=data},
        error => {console.log(error);
        })
  }

  refresh($event: any) {
    this.calendrierService.getcalendriers().subscribe(
      data => {
        this.listCalendrier = data;
      });


  }

}
