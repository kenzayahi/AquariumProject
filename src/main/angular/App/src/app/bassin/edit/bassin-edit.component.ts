import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Bassin, Etat} from "../../model/bassin";
import {BassinService} from "../bassin.service";

@Component({
  selector: 'app-bassin',
  templateUrl: './bassin-edit.component.html',
  styleUrls: ['./bassin-edit.component.css']
})
export class BassinEditComponent implements OnInit {

  formGroup: FormGroup;
  etat=[ Etat.propre,Etat.sale];

  @Output()
  createBassin= new EventEmitter<Bassin>();
  private role: any;

  constructor(private formBuilder: FormBuilder,
              private bassinService:BassinService,
              protected router: Router,
              protected snackBar: MatSnackBar,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
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
            this.snackBar.open('Le Bassin a bien été créer', 'OK', { verticalPosition: 'top',duration:4000});
            this.router.navigate(['/bassin/'+this.role])},
          error=>console.log(error)
        );
  }

  reset(){
    this.formGroup.reset();
  }

}
