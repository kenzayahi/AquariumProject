import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Bassin, Etat} from "../../model/bassin";
import {BassinService} from "../bassin.service";
import {Espece} from "../../model/espece";

@Component({
  selector: 'app-update-bassin',
  templateUrl: './update-bassin.component.html',
  styleUrls: ['./update-bassin.component.css']
})
export class UpdateBassinComponent implements OnInit {
  etat=[ Etat.propre,Etat.sale];
  id:number;
  formGroup: FormGroup;
  listEspece:Array<Espece>;
  @Output()
  updateBassin=new EventEmitter<Bassin>();
  private role: string;
  constructor(private bassinService : BassinService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.role = this.route.snapshot.params['role'];
    this.bassinService.getBassin(this.id).subscribe(data => {
        this.listEspece=data.especeList;
        this.formGroup = new FormGroup({
          numBassin: new FormControl(data.numBassin),
          volumeEau: new FormControl(data.volumeEau),
          capaciteMax: new FormControl(data.capaciteMax),
          etat: new FormControl(data.etat),
        });
      }
    );
  }


  onUpdateBassin() {
    let bassin: Bassin =  this.formGroup.value;
    bassin.id = this.id;
    bassin.especeList=this.listEspece;
    this.bassinService.updateBassin(bassin).subscribe(
      data => this.updateBassin.emit(bassin),
      error => console.log(error)
    );

  }
}
