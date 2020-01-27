import {Component, OnInit} from '@angular/core';
import {EspeceService} from './espece.service';

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

}
