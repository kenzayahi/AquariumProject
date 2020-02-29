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
      .deleteActivity(this.activity.id)
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
}
