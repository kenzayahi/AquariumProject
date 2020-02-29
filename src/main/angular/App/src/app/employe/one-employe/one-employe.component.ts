import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employe} from '../../model/employe';
import {EmployeService} from '../employe.service';

@Component({
  selector: 'tr [employe]',
  templateUrl: './one-employe.component.html',
  styleUrls: ['./one-employe.component.css']
})
export class OneEmployeComponent implements OnInit {
  @Input()
  employe: Employe;

  @Output()
  deleteEmploye = new EventEmitter<Employe>();
  constructor(private employeService: EmployeService) { }

  ngOnInit() {
  }

  onDeleteEmploye(id: any){
    this.employeService
      .deleteEmploye(this.employe.id)
      .subscribe(
        data=> this.deleteEmploye.emit(this.employe),
        error => {console.log(error);
        })
  }

}
