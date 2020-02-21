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
  EmployeConnecter:Employe;

  getAthentification($event: Employe) {
     this.EmployeConnecter=$event;
     this.roleEmploye=this.EmployeConnecter.roleEmploye;
     this.isConnected=true;
  }
}
