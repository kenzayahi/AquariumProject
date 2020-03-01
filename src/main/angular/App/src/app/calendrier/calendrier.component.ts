import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Employe, RoleEmploye} from '../model/employe';
import {CalendrierService} from './calendrier.service';
import {Calendrier} from '../model/calendrier';
import {EmployeService} from "../employe/employe.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Activity} from "../model/activity";
import {Espece} from "../model/espece";

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
  activities :Array<Activity> ;

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
        if(this.isResponsable){
          this.onGetCalendrier();
        }else if(this.isSimpleEmploye){
         // this.onGetEmployeCalendrier();
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

  refresh($event: any) {
    this.calendrierService.getcalendriers().subscribe(
      data => {
        this.listCalendrier = data;
      });
  }
  getBeginWeek(semaine, annee):Date{
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

  getEndWeek(begin, semaine, annee):Date{
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
    if (this.isResponsable) {
      this.calendrierService.getActivityOfEveryone(this.formGroup.get('semaine').value, this.formGroup.get('annee').value).subscribe(

        data => this.activities = data
      )

    } else {
      this.calendrierService.getActivityOf(this.formGroup.get('semaine').value, this.formGroup.get('annee').value, this.idEmploye).subscribe(
        data => {
          this.activities = data;
          console.log(this.activities)
        }
      )
    }
  }


  afficherResponsable(responsableList:Array<Employe>) {
      let s : string = "";
      for(let i = 0; i < responsableList.length; i++){
        s +="\n";
        s += responsableList[i].nom+" " ;
        s +=" "+responsableList[i].prenom;
        if(i != responsableList.length - 1)
          s+= "/ " ;
      }
      return s

  }
}
