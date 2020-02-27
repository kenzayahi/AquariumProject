import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Activity, TypeActivity} from "../../model/activity";
import {ActivityService} from "../activity.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employe} from "../../model/employe";
import {EmployeService} from "../../employe/employe.service";

@Component({
  selector: 'app-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit {

  formGroup: FormGroup;
  type=[ TypeActivity.bilan,TypeActivity.entretien,TypeActivity.nourrissage];

  employes: Array<Employe>;

  @Output()
  createActivity = new EventEmitter<Activity>();

  constructor(private formBuilder: FormBuilder,
              private activityService: ActivityService,
              private employeService: EmployeService,
              protected router: Router,
              protected snackBar: MatSnackBar,
  ) {
    this.onGetEmploye();
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
    });
  }
  onCreateActivity(){
    let activity : Activity = this.formGroup.value;
    this.activityService
      .createActivity(activity)
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

  onGetEmploye(){
    this.employeService
      .getEmployes()
      .subscribe(
        data => {this.employes = data;},
        error => {console.log(error);
        });
  }

}
