import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EspeceService} from '../espece.service';
import {Espece, RegimeAlimentaire} from '../../model/espece';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-espece',
  templateUrl: './espece-edit.component.html',
  styleUrls: ['./espece-edit.component.css']
})
export class EspeceEditComponent implements OnInit {

  formGroup: FormGroup;
  regimeAlimentaire=[ RegimeAlimentaire.piscivore,RegimeAlimentaire.alguivore,RegimeAlimentaire.planctonivore];

  @Output()
  createEspece= new EventEmitter<Espece>();

  constructor(private formBuilder: FormBuilder,
              private especeService:EspeceService,
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
      'esperanceVie': [null, Validators.required],
      'regimeAlimentaire': [null, Validators.required],
      'menacee': [null, Validators.required],
    });
  }
  onCreateEspece(){
    this.especeService
        .createEspece(this.formGroup.value)
        .subscribe(
          data=>{this.createEspece.emit(this.formGroup.value);
            this.snackBar.open('L"Espèce a bien été créer', 'OK', { verticalPosition: 'top',duration:4000});
            this.router.navigate(['/espece'])},
          error=>console.log(error)
        );
  }

  reset(){
    this.formGroup.reset();
  }

}
