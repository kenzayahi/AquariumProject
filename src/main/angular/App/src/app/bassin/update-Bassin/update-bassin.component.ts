import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Bassin, Etat} from "../bassin";
import {BassinService} from "../bassin.service";

@Component({
  selector: 'app-update-bassin',
  templateUrl: './update-bassin.component.html',
  styleUrls: ['./update-bassin.component.css']
})
export class UpdateBassinComponent implements OnInit {
  etat=[ Etat.propre,Etat.sale];
  id:number;
  formGroup: FormGroup;
  @Output()
  updateBassin=new EventEmitter<Bassin>();
  constructor(private bassinService : BassinService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.bassinService.getBassin(this.id).subscribe(data => {

        this.formGroup = new FormGroup({
          numBassin: new FormControl(data.numBassin),
          volumeEau: new FormControl(data.volumeEau),
          capaciteMax: new FormControl(data.capaciteMax),
          etat: new FormControl(data.etat)
        });
      }
    );
  }


  onUpdateBassin() {
    let bassin: Bassin =  this.formGroup.value;
    bassin.id = this.id;
    this.bassinService.updateBassin(bassin).subscribe(
      data => this.updateBassin.emit(bassin),
      error => console.log(error)
    );

  }
}
