import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoleEmploye} from '../model/employe';
import {CalendrierService} from './calendrier.service';
import {Calendrier} from '../model/calendrier';

@Component({
  selector: 'app-calendrier',
  templateUrl: './update-calendrier.component.html',
  styleUrls: ['./update-calendrier.component.css']
})
export class UpdateCalendrierComponent implements OnInit {

  private role: any;

  constructor(private calendrierService: CalendrierService,private route:ActivatedRoute) { }

  listCalendrier:any;
  isResponsable=false;
  isSimpleEmploye=false;


  @Output()
  updateCalendrier = new EventEmitter<Calendrier>();

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
    if(this.role==RoleEmploye.responsableBassin){
      this.isResponsable=true;
    }else if(this.role ==RoleEmploye.simpleEmploye){
      this.isSimpleEmploye=true;
    }
    this.onGetCalendrier()
  }
  onGetCalendrier(){
    this.calendrierService
      .getcalendriers()
      .subscribe(
        data=>{this.listCalendrier=data;console.log(data)},
        error => {console.log(error);
        })
  }

  refresh($event: any) {
    this.calendrierService.getcalendriers().subscribe(
      data => {
        this.listCalendrier = data;
      });


  }

}
