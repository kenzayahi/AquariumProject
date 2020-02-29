import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Activity, TypeActivity} from "../../model/activity";
import {ActivityService} from "../activity.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employe} from "../../model/employe";
import {EmployeService} from "../../employe/employe.service";
import {BassinService} from "../../bassin/bassin.service";
import {Bassin} from "../../model/bassin";

@Component({
  selector: 'app-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit {

  formGroup: FormGroup;
  type=[ TypeActivity.bilan_veterinaire,TypeActivity.entretien,TypeActivity.nourrissage,TypeActivity.verifier_stock_nouriture];

  employes: Array<Employe>;

  @Output()
  createActivity = new EventEmitter<Activity>();
  private bassins: Array<Bassin>;

  constructor(private formBuilder: FormBuilder,
              private activityService: ActivityService,
              private employeService: EmployeService,
              private bassinService:BassinService,
              protected router: Router,
              protected snackBar: MatSnackBar,
  ) {
    this.onGetEmploye();
    this.onGetBassins();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'type': [null, Validators.required],
      'dateDebut': [null, Validators.required],
      'dateFin': [null, Validators.required],
      'accessible': [null, Validators.required],
      'bassin': [null, Validators.required],
    });
  }
  onCreateActivity(){
    let activity : Activity = this.formGroup.value;
    let idBassin = activity.bassin.id;
    console.log("id bassin"+idBassin);
    activity.bassin = null;
    this.activityService
      .createActivity(activity,idBassin)
      .subscribe(
        data=>{this.createActivity.emit(this.formGroup.value);
          this.snackBar.open('L"activité  a bien été créer', 'OK', { verticalPosition: 'top' });
          console.log(data);
          this.router.navigate(['/activity'])},
        error=>console.log(error)
      );
  }

  reset(){
    this.formGroup.reset();
  }

  onGetBassins(){
    this.bassinService
      .getBassins()
      .subscribe(
        data=>{this.bassins=data;},
        error => {console.log(error);
        })
  }

  onGetEmploye(){
    this.employeService
      .getEmployes()
      .subscribe(
        data => {this.employes = data;},
        error => {console.log(error);
        });
  }

}
