import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecteurService} from "../secteur.service";
import {Bassin} from "../../model/bassin";

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-secteur.component.html',
  styleUrls: ['./dialog-secteur.component.css']
})
export class DialogSecteurComponent implements OnInit {

  private formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private secteurService:SecteurService ,
    private dialogRef: MatDialogRef<DialogSecteurComponent>,
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
