import { Component } from '@angular/core';
import {Employe, RoleEmploye} from "./model/employe";

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
  isSimpleEmploye=false;

  getAthentification($event: Employe) {
     this.employeConnecter=$event;
     this.roleEmploye=this.employeConnecter.roleEmploye;
     this.isConnected=true;
     if(this.roleEmploye==RoleEmploye.simpleemploye){
       this.isSimpleEmploye=true;
     }
  }

  disconnect($event: boolean) {
    if($event==true){
      this.isConnected=false;
      this.isVisiteur=false;
      this.isSimpleEmploye=false;
    }
  }


  toVisite($event: boolean) {
    if($event==true){
      this.isVisiteur=true;
      this.isConnected=true;
    }
  }
}
