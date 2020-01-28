import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EspeceService} from "../espece.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Espece, RegimeAlimentaire} from "../espece";

@Component({
  selector: 'app-update-espece',
  templateUrl: './update-espece.component.html',
  styleUrls: ['./update-espece.component.css']
})
export class UpdateEspeceComponent implements OnInit {

  regimeAlimentaire=[ RegimeAlimentaire.piscivore,RegimeAlimentaire.alguivore,RegimeAlimentaire.planctonivore];

  id:number;
  formGroup: FormGroup;
  @Output()
  updateEspece=new EventEmitter<Espece>();
  constructor(private especeService : EspeceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    let esp: Espece;
    this.especeService.getEspece(this.id).subscribe(data => {

        this.formGroup = new FormGroup({
          nom: new FormControl(data.nom),
          esperanceVie: new FormControl(data.esperanceVie),
          regimeAlimentaire: new FormControl(data.regimeAlimentaire),
          menacee: new FormControl(data.menacee)
        });
      }
    );
  }


  onUpdateEspece() {
    let espece: Espece =  this.formGroup.value;
    espece.id = this.id;
    this.especeService.updateEspece(espece).subscribe(
      data => this.updateEspece.emit(espece),
      error => console.log(error)
    );

  }
}
