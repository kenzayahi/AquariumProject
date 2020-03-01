import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoleEmploye} from '../model/employe';
import {CalendrierService} from './calendrier.service';
import {Calendrier} from '../model/calendrier';
import {EmployeService} from "../employe/employe.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  employe:any;
  role: any;
  idEmploye:number;
  annees = [2019, 2020, 2021];
  semaines = [];
  formGroup : FormGroup;
  activities = [];

  constructor(private calendrierService: CalendrierService,
              private route:ActivatedRoute,
              private employeService:EmployeService,
              private formBuilder:FormBuilder) { }

  listCalendrier:any;
  employeCalendrier:any;
  isResponsable=false;
  isSimpleEmploye=false;


  @Output()
  updateCalendrier = new EventEmitter<Calendrier>();

  ngOnInit() {
    this.init();
    this.init();
    for(let i = 0; i < 54; i++)
      this.semaines.push(i);
    console.log(this.role);
  }
    init() {
      this.formGroup = this.formBuilder.group({
        semaine : new FormControl(this.semaines[0]),
        annee : new FormControl(this.annees[0])

      });
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
        console.log("init Role=>"+this.role);
        if(this.isResponsable){
          this.onGetCalendrier();
        }else if(this.isSimpleEmploye){
         // this.onGetEmployeCalendrier();
        }
        console.log("employeCalendrier=>"+this.employeCalendrier);
        console.log("listCalendrier=>"+this.listCalendrier);
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

  refresh($event: any) {
    this.calendrierService.getcalendriers().subscribe(
      data => {
        this.listCalendrier = data;
      });
  }
  getBeginWeek(semaine, annee){
    if(semaine == 0){
      let begin = new Date();
      begin.setFullYear(annee, 0, 1);
      begin.setHours(0);
      begin.setMinutes(0);
      return begin;
    }

    let debut = new Date();
    debut.setUTCFullYear(annee,0,1);
    let firstDay = debut.getDay();
    let lgth = (8 - firstDay);
    let ajout = (semaine - 1)*7 + (lgth + 1);
    let begin = new Date();
    begin.setFullYear(annee, 0, ajout);
    begin.setHours(0);
    begin.setMinutes(0);
    return begin;
  }

  getEndWeek(begin, semaine, annee){
    if(semaine == 0){
      let firstDay = begin.getDay();
      let lgth = (8 - firstDay);
      let ajout = (semaine)*7 + (lgth + 1);
      let end = new Date();
      end.setFullYear(annee, 0, ajout-1);
      end.setHours(23);
      end.setMinutes(59);
      return end;
    }
    let debut = new Date();
    debut.setUTCFullYear(annee,0,1);
    let firstDay = debut.getDay();
    let lgth = (8 - firstDay);
    let ajout = (semaine - 1)*7 + (lgth + 1);
    let end = new Date();
    end.setFullYear(annee,0,ajout+6);
    let fin = new Date();
    fin.setFullYear(annee, 11, 31);
    if(end.getTime() > fin.getTime()) {
      end.setFullYear(annee, 11, 31);
    }
    end.setHours(23);
    end.setMinutes(59);
    return end;

  }

  onSubmit() {
    this.calendrierService.getActivityOf(this.formGroup.get('semaine').value , this.formGroup.get('annee').value, this.idEmploye).subscribe(
      data =>{
        this.activities = data;
        console.log(this.activities)
      }
    )
  }


}
