import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EspeceService} from '../espece.service';
import {RegimeAlimentaire} from '../espece';

@Component({
  selector: 'app-espece',
  templateUrl: './espece-edit.component.html',
  styleUrls: ['./espece-edit.component.css']
})
export class EspeceEditComponent implements OnInit {

  formGroup: FormGroup;
  regimeAlimentaire=[ RegimeAlimentaire.piscivore,RegimeAlimentaire.alguivore,RegimeAlimentaire.planctonivore]

  constructor(private formBuilder: FormBuilder,private especeService:EspeceService) {
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
    console.log(this.formGroup.value)
    this.especeService.createEspece(this.formGroup.value);
  }

  reset(){
    this.formGroup.reset();
  }

}
