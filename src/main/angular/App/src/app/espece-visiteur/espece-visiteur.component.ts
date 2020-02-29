import { Component, OnInit } from '@angular/core';
import {EspeceService} from "../espece/espece.service";
import {Espece} from "../model/espece";

@Component({
  selector: 'app-espece-visiteur',
  templateUrl: './espece-visiteur.component.html',
  styleUrls: ['./espece-visiteur.component.css']
})
export class EspeceVisiteurComponent implements OnInit {
  private listEspeces: Array<Espece>;

  constructor(private especeService:EspeceService) { }

  ngOnInit() {
    this.onGetEspeces();
  }
  onGetEspeces(){
    this.especeService
      .getEspeces()
      .subscribe(
        data=>{this.listEspeces=data;},
        error => {console.log(error);
        })
  }

}
