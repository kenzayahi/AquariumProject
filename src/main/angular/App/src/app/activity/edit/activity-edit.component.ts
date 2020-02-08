import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Activity, TypeActivity} from "../../model/activity";
import {ActivityService} from "../activity.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit {

  formGroup: FormGroup;
  type=[ TypeActivity.bilan,TypeActivity.entretien,TypeActivity.nourrissage];

  @Output()
  createActivity= new EventEmitter<Activity>();

  constructor(private formBuilder: FormBuilder,
              private activityService:ActivityService,
              protected router: Router,
              protected snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'type': [null, Validators.required],
      'dateDebut': [null, Validators.required],
      'dateFin': [null, Validators.required],
      'responsable': [null, Validators.required],
      'isPublic': [null, Validators.required],
    });
  }
  onCreateBassin(){
    this.activityService
      .createActivity(this.formGroup.value)
      .subscribe(
        data=>{this.createActivity.emit(this.formGroup.value);
          this.snackBar.open('L"activité  a bien été créer', 'OK', { verticalPosition: 'top' });
          this.router.navigate(['/activity'])},
        error=>console.log(error)
      );
  }

  reset(){
    this.formGroup.reset();
  }

}
