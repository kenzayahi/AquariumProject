import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
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
  private idEmployeConnecter: any;
  constructor(
    private calendrierService : CalendrierService,
    private route: ActivatedRoute,
    private employeService:EmployeService,
    private router:Router)
  {
  }

  ngOnInit() {
    this.onGetsimpleEmploye();
    this.id = this.route.snapshot.params['id'];
    this.idEmployeConnecter = this.route.snapshot.params['idEmploye'];
    this.calendrierService.getEmployeFromCalendrier(this.id).subscribe(
      data2 => {
        this.calendrierService.getCalendrier(this.id).subscribe(data => {
            this.formGroup = new FormGroup({
              id: new FormControl(this.id),
              date: new FormControl(data.date),
              employe: new FormControl(data2.id),
            });
          }
        );
      });
      }
  onGetsimpleEmploye(){
    this.employeService
      .getSimpleEmployes()
      .subscribe(
        data=>{this.employes=data},
        error => {console.log(error);
        })
  }

  onUpdateCalendrier() {
    let calendrier: Calendrier =  this.formGroup.value;
    calendrier.id = this.id;
    let idEmploye = this.formGroup.get('employe').value;
    calendrier.employe = null;
    this.calendrierService.updateCalendrier(calendrier,idEmploye).subscribe(
      data => {this.updateCalendrier.emit(calendrier),
      this.router.navigate(['/calendrier/'+this.idEmployeConnecter])},
  error => console.log(error)
    );

  }

  reset(){
    this.formGroup.reset();
  }

}
