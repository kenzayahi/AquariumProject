import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BassinService} from "./bassin.service";
import {Bassin} from '../model/bassin';
import {ActivatedRoute} from "@angular/router";
import {RoleEmploye} from "../model/employe";

@Component({
  selector: 'app-bassin',
  templateUrl: './bassin.component.html',
  styleUrls: ['./bassin.component.css']
})
export class BassinComponent implements OnInit {
  private role: any;

  constructor(private bassinService:BassinService,private route:ActivatedRoute) { }

  listBassin:any;
  isGestionnaire=false;

  @Output()
  updateBassin = new EventEmitter<Bassin>();

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
    if(this.role==RoleEmploye.gestionnaire){
      this.isGestionnaire=true;
    }
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
