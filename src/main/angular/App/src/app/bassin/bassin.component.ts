import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BassinService} from "./bassin.service";
import {Bassin} from '../model/bassin';

@Component({
  selector: 'app-bassin',
  templateUrl: './bassin.component.html',
  styleUrls: ['./bassin.component.css']
})
export class BassinComponent implements OnInit {

  constructor(private bassinService:BassinService) { }

  listBassin:any;

  @Output()
  updateBassin = new EventEmitter<Bassin>();

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
