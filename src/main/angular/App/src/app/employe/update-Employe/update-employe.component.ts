import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Employe} from '../../model/employe';
import {EmployeService} from '../employe.service';

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.css']
})
export class UpdateEmployeComponent implements OnInit {
  id:number;
  formGroup: FormGroup;
  @Output()
  updateEmploye=new EventEmitter<Employe>();
  constructor(private employeService : EmployeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.employeService.getEmploye(this.id).subscribe(data => {

        this.formGroup = new FormGroup({
          nom: new FormControl(data.nom),
          prenom: new FormControl(data.prenom),
          dateNaissance: new FormControl(data.dateNaissance),
          adress: new FormControl(data.adress),
          numSecurite: new FormControl(data.numSecurite)
        });
      }
    );
  }


  onUpdateEmploye() {
    let employe: Employe =  this.formGroup.value;
    employe.id = this.id;
    this.employeService.updateEmploye(employe).subscribe(
      data => this.updateEmploye.emit(employe),
      error => console.log(error)
    );

  }
}
