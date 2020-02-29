import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BassinService} from "../../bassin/bassin.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Bassin} from "../../model/bassin";

@Component({
  selector: 'app-dialog-overview-employe',
  templateUrl: './dialog-overview-employe.component.html',
  styleUrls: ['./dialog-overview-employe.component.css']
})
export class DialogOverviewEmployeComponent implements OnInit {

  private formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private bassinService:BassinService,
    private dialogRef: MatDialogRef<DialogOverviewEmployeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<Bassin>) {
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
      'bassin': [null, Validators.required],
    });
  }

  doAction() {
    let id=this.formGroup.get("bassin").value;
    this.dialogRef.close({data:id});
    console.log("data envoyer"+id);
  }


}
