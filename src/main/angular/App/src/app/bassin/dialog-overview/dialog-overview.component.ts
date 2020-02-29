import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Espece} from "../../model/espece";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EspeceService} from "../../espece/espece.service";
export interface dataDialog {
  idEspece:number
}
@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverviewComponent implements OnInit {

  private formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private especeService:EspeceService,
    private dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<Espece>) {
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
      'espece': [null, Validators.required],
    });
  }

  doAction() {
    let id=this.formGroup.get("espece").value;
    this.dialogRef.close({data:id});
    console.log("data envoyer"+id);
  }
}
