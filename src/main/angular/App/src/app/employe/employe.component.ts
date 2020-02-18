import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EmployeService} from './employe.service';
import {Employe} from '../model/employe';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  constructor(private employeService:EmployeService) { }

  listEmploye:any;

  @Output()
  updateEmploye = new EventEmitter<Employe>();

  ngOnInit() {
    this.onGetBassin()
  }
  onGetBassin(){
    this.employeService
      .getEmployes()
      .subscribe(
        data=>{this.listEmploye=data;},
        error => {console.log(error);
        })
  }

  refresh($event: any) {
    this.employeService.getEmployes().subscribe(
      data => this.listEmploye = data


    );
  }
}
