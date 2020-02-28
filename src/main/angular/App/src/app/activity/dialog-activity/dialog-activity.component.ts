import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivityService} from "../../activity/activity.service";
import {Activity} from "../../model/activity";
import {Employe} from "../../model/employe";

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-activity.component.html',
  styleUrls: ['./dialog-activity.component.css']
})
export class DialogActivityComponent implements OnInit {

  private formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private activityService:ActivityService ,
    private dialogRef: MatDialogRef<DialogActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<Employe>) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'employe': [null, Validators.required],
    });
  }

  doAction() {
    let id=this.formGroup.get("employe").value;
    this.dialogRef.close({data:id});
    console.log("data envoyer"+id);
  }
}
