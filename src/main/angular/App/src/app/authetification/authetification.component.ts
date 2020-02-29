import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "./authentification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employe} from "../model/employe";

@Component({
  selector: 'app-authetification',
  templateUrl: './authetification.component.html',
  styleUrls: ['./authetification.component.css']
})
export class AuthetificationComponent implements OnInit {

  formGroup: FormGroup;
  @Output()
  loginEvent=new EventEmitter<Employe>();

  @Output()
  visiteurEvent=new EventEmitter<boolean>();

  constructor(   private formBuilder: FormBuilder,
                 private authentificationService:AuthentificationService,
                 private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'login': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }
  login() {
    this.authentificationService
      .authentificate(this.formGroup.value)
      .subscribe(
        data=> this.loginEvent.emit(data),
        error=> {
          this.snackBar.open("Wrong login or Password", "ok", {verticalPosition: 'top'});
        }
      );
  }

  visiteurLogin() {
    this.visiteurEvent.emit(true);
  }
}
