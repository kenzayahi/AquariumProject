import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Espece} from "../espece/espece";
import {BassinService} from "./bassin.service";

@Component({
  selector: 'app-bassin',
  templateUrl: './bassin.component.html',
  styleUrls: ['./bassin.component.css']
})
export class BassinComponent implements OnInit {

  constructor(private bassinService:BassinService) { }

  listBassin:any;

  @Output()
  updateBassin = new EventEmitter<Espece>();

  ngOnInit() {
    this.onGetBassin()
  }
  onGetBassin(){
    this.bassinService
      .getBassins()
      .subscribe(
        data=>{this.listBassin=data;},
        error => {console.log(error);
        })
  }

  refresh($event: any) {
    this.bassinService.getBassins().subscribe(
      data => this.listBassin = data


    );


  }

}
