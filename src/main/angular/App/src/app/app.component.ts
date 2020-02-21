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

  getAthentification($event: Employe) {
     this.employeConnecter=$event;
     this.roleEmploye=this.employeConnecter.roleEmploye;
     this.isConnected=true;
  }

  disconnect($event: boolean) {
    if($event==true){
      this.isConnected=false;
    }
  }
}
