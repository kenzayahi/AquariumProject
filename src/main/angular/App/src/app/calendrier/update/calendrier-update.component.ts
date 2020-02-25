import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Calendrier} from "../../model/calendrier";
import {CalendrierService} from "../calendrier.service";
import {EmployeService} from "../../employe/employe.service";
import {Employe} from "../../model/employe";

@Component({
  selector: 'app-update',
  templateUrl: './calendrier-update.component.html',
  styleUrls: ['./calendrier-update.component.css']
})
export class CalendrierUpdateComponent implements OnInit {

  id:number;
  nom:string;
  formGroup: FormGroup;
  @Output()
  updateCalendrier=new EventEmitter<Calendrier>();
  private employes: Array<Employe>;
  constructor(
    private calendrierService : CalendrierService,
    private route: ActivatedRoute,
    private employeService:EmployeService)
  {
  }

  ngOnInit() {
    this.onGetsimpleEmploye();
    this.id = this.route.snapshot.params['id'];

        this.calendrierService.getCalendrier(this.id).subscribe(data => {
            this.formGroup = new FormGroup({
              id: new FormControl(this.id),
              date: new FormControl(data.date),
              employe: new FormControl(data.employe),
            });
        }
        );
      }
  onGetsimpleEmploye(){
    this.employeService
      .getSimpleEmployes()
      .subscribe(
        data=>{this.employes=data;console.log(data)},
        error => {console.log(error);
        })
  }

  onUpdateCalendrier() {
    let calendrier: Calendrier =  this.formGroup.value;
    calendrier.id = this.id;
    this.calendrierService.updateCalendrier(calendrier).subscribe(
      data => this.updateCalendrier.emit(calendrier),
      error => console.log(error)
    );

  }




  reset(){
    this.formGroup.reset();
  }

}
