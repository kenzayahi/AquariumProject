import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {EspeceService} from './espece.service';
import {Espece} from '../model/espece';

@Component({
  selector: 'app-espece',
  templateUrl: './espece.component.html',
  styleUrls: ['./espece.component.css']
})
export class EspeceComponent implements OnInit {

  constructor(private especeService:EspeceService) { }

  listEspeces:any;

  @Output()
  updateEspece = new EventEmitter<Espece>();

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

  refresh($event: any) {
    this.especeService.getEspeces().subscribe(
      data => this.listEspeces = data


    );


  }
}
