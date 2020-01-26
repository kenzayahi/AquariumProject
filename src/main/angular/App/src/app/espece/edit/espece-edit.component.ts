import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnimalService} from "../../animal/animal.service";

@Component({
  selector: 'app-espece',
  templateUrl: './espece-edit.component.html',
  styleUrls: ['./espece-edit.component.css']
})
export class EspeceEditComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';

  constructor(private formBuilder: FormBuilder,private animalService:AnimalService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'nom': [null, Validators.required],
      'esperanceVie': [null, Validators.required],
      'regimeAlimentaire': [null, Validators.required],
      'menacee': [null, Validators.required],
    });
  }
  onCreateEspece(){
    console.log("$$$$$$$$$$$$$$$$fin************");
    this.animalService
      .createAnimal(this.formGroup.value);
  }

  reset(){
    this.formGroup.reset();
  }

}
