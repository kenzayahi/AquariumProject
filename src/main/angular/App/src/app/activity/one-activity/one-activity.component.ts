import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from "../../model/activity";
import {ActivityService} from "../activity.service";
import {Employe} from "../../model/employe";
import {Espece} from "../../model/espece";
import {Bassin} from "../../model/bassin";

@Component({
  selector: 'tr [activity]',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.css']
})
export class OneActivityComponent implements OnInit {

  @Input()
  activity: Activity;

  hasResponsable:boolean=false;

  @Output()
  deleteActivity = new EventEmitter<Activity>();
  constructor(private activityService: ActivityService) { }

  ngOnInit() {
  }

  onDeleteActivity(id: any){
    this.activityService
      .deleteActivity(this.activity.id, this.getWeek(this.activity.dateDebut), new Date(this.activity.dateDebut).getFullYear())
      .subscribe(
        data=> this.deleteActivity.emit(this.activity),
        error => {console.log(error);
        })
  }

  afficher(responsableList: Array<Employe>):string {
    let s : string = "";
    if(responsableList.length !== 0){
      for(let i = 0; i < responsableList.length; i++){
        this.hasResponsable=true;
        s += responsableList[i].nom ;
        if(i != responsableList.length - 1)
          s+= "/ " ;
      }
    }else{
      this.hasResponsable=false;
      s="Affecter un responsable";
    }
    return s
  }

  formatDate(nombre : number, chiffre : number) {

    var temp = '' + nombre;
    while ((temp.length < chiffre) && (temp = '0' + temp)) {
    }
    return temp;
  }

  printHours(d: Date) {
    return this.formatDate(new Date(d).getHours(), 2) + ":" + this.formatDate(new Date(d).getMinutes(), 2);
  }


  containsDate(d : Date, begin, end){
    return begin < d && end > d;

  }



  getWeek(date : Date){
    for(let i = 0 ; i < 53; i++){
      let begin = this.getBeginWeek(i, new Date(date).getFullYear());
      let end = this.getEndWeek(begin, i, new Date(date).getFullYear());
      if(this.containsDate(new Date(date), begin, end))
        return i+1;
    }

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
    let firstDay =  debut.getDay();
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
      let firstDay =  begin.getDay();
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
    let firstDay =  debut.getDay();
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

}
