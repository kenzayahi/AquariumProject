import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Employe} from '../../model/employe';
import {EmployeService} from '../employe.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe-edit.component.html',
  styleUrls: ['./employe-edit.component.css']
})
export class EmployeEditComponent implements OnInit {

  formGroup: FormGroup;

  @Output()
  createEmploye= new EventEmitter<Employe>();

  constructor(private formBuilder: FormBuilder,
              private employeService:EmployeService,
              protected router: Router,
              protected snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'nom': [null, Validators.required],
      'prenom': [null, Validators.required],
      'numSecurite': [null, Validators.required],
      'adress': [null, Validators.required],
      'dateNaissance': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],

    });
  }
  onCreateBassin(){
    this.employeService
        .createEmploye(this.formGroup.value)
        .subscribe(
          data=>{this.createEmploye.emit(this.formGroup.value);
            this.snackBar.open('L"employe a bien été créer', 'OK', { verticalPosition: 'top' });
            this.router.navigate(['/employe'])},
          error=>console.log(error)
        );
  }

  reset(){
    this.formGroup.reset();
  }

}
