import {Component, OnInit} from '@angular/core';
import {EspeceService} from './espece.service';
import {Espece} from './espece';

@Component({
  selector: 'app-espece',
  templateUrl: './espece.component.html',
  styleUrls: ['./espece.component.css']
})
export class EspeceComponent implements OnInit {

  constructor(private especeService:EspeceService) { }

  listEspeces:any;


  ngOnInit() {
    this.onGetEspeces()
  }
  onGetEspeces(){
    this.especeService
      .getEspeces()
      .subscribe(
        data=>{this.listEspeces=data;},
        error => {console.log(error);
        })
  }

  onDeleteEspece(id: any){
    this.especeService
      .deleteEspece(id)
      .subscribe(
        data=>{this.listEspeces=data;},
        error => {console.log(error);
        })

  }

  onUpdateEspece(espece: Espece) {
    this.especeService
      .updateEspece(espece)
      .subscribe(
        data=>{this.listEspeces=data;},
        error => {console.log(error);
        })
  }
}
