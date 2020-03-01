import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Calendrier} from "../../model/calendrier";
import {CalendrierService} from "../calendrier.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeService} from "../../employe/employe.service";
import {RoleEmploye} from "../../model/employe";

@Component({
  selector: 'app-edit',
  templateUrl: './calendrier-edit.component.html',
  styleUrls: ['./calendrier-edit.component.css']
})
export class CalendrierEditComponent implements OnInit {

  formGroup: FormGroup;

  @Output()
  createCalendrier= new EventEmitter<Calendrier>();
  private role: any;
  idEmploye: any;
  employe: any;
  isResponsable:boolean;
  isSimpleEmploye:boolean;

  constructor(private formBuilder: FormBuilder,
              private calendrierService:CalendrierService,
              private employeService:EmployeService,
              protected router: Router,
              protected snackBar: MatSnackBar,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.init();
    this.createForm();
  }
  init() {
    this.idEmploye = this.route.snapshot.params['idEmploye'];
    this.employe = this.employeService.getEmploye(this.idEmploye).subscribe(
      data => {
        this.role = this.employe.roleEmploye;
        if (this.role == RoleEmploye.responsablebassin) {
          this.isResponsable = true;
        } else if (this.role == RoleEmploye.simpleemploye) {
          this.isSimpleEmploye = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'numSemaine': [null, Validators.required],
    });
  }
  onCreateCalendrier(){
    this.calendrierService
      .createCalendrier(this.formGroup.value)
      .subscribe(
        data=>{this.createCalendrier.emit(this.formGroup.value);
          this.snackBar.open('Le Calendrier a bien été créer', 'OK', { verticalPosition: 'top' });
          this.router.navigate(['/calendrier/'+this.idEmploye])},
        error=>console.log(error)
      );
  }

  reset(){
    this.formGroup.reset();
  }

}
