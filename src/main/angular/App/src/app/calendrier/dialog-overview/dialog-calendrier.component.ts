import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivityService} from "../../activity/activity.service";
import {Activity} from "../../model/activity";

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-calendrier.component.html',
  styleUrls: ['./dialog-calendrier.component.css']
})
export class DialogCalendrierComponent implements OnInit {

  private formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private activityService:ActivityService ,
    private dialogRef: MatDialogRef<DialogCalendrierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<Activity>) {
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
      'activity': [null, Validators.required],
    });
  }

  doAction() {
    let id=this.formGroup.get("activity").value;
    this.dialogRef.close({data:id});
    console.log("data envoyer"+id);
  }
}
