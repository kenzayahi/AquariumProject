import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {AnimalService} from "../animal.service";

@Component({
  selector: 'app-animal',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css']

})
export class AnimalEditComponent implements OnInit {
  formGroup: FormGroup;
  post: any = '';


  especes: any;
  constructor(private formBuilder: FormBuilder,private animalService:AnimalService) {
    this.especes = this.onGetespeces();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'sexe': [null, Validators.required],
      'espece': [null, Validators.required],
      'signe': [null, Validators.required],
    });
  }
  onCreateAnimal(){
    console.log("$$$$$$$$$$$$$$$$fin************");
    this.animalService
        .createAnimal(this.formGroup.value);
  }

  reset(){
    this.formGroup.reset();
  }

  onGetespeces(){
    this.animalService
      .getEspeces()
      .subscribe(
        data=>{this.especes=data;},
        error => {console.log(error);
        })
  }
}

