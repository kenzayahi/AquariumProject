import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Bassin, Etat} from "../bassin";
import {BassinService} from "../bassin.service";

@Component({
  selector: 'app-espece',
  templateUrl: './bassin-edit.component.html',
  styleUrls: ['./bassin-edit.component.css']
})
export class BassinEditComponent implements OnInit {

  formGroup: FormGroup;
  etat=[ Etat.propre,Etat.sale];

  @Output()
  createBassin= new EventEmitter<Bassin>();

  constructor(private formBuilder: FormBuilder,
              private bassinService:BassinService,
              protected router: Router,
              protected snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'numBassin': [null, Validators.required],
      'capaciteMax': [null, Validators.required],
      'volumeEau': [null, Validators.required],
      'etat': [null, Validators.required],
    });
  }
  onCreateBassin(){
    this.bassinService
        .createBassin(this.formGroup.value)
        .subscribe(
          data=>{this.createBassin.emit(this.formGroup.value);
            this.snackBar.open('Le Bassin a bien été créer', 'OK', { verticalPosition: 'top' });
            this.router.navigate(['/bassin'])},
          error=>console.log(error)
        );
  }

  reset(){
    this.formGroup.reset();
  }

}
