import { Component } from '@angular/core';
import {Employe} from "./model/employe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  isConnected=false;
  roleEmploye: any;
  employeConnecter:Employe;
  isVisiteur :boolean=false;

  getAthentification($event: Employe) {
     this.employeConnecter=$event;
     this.roleEmploye=this.employeConnecter.roleEmploye;
     this.isConnected=true;
  }

  disconnect($event: boolean) {
    if($event==true){
      this.isConnected=false;
      this.isVisiteur=false;
    }
  }


  toVisite($event: boolean) {
    if($event==true){
      this.isVisiteur=true;
      this.isConnected=true;
    }
  }
}
