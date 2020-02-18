import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bassin} from "../../model/bassin";
import {BassinService} from "../bassin.service";

@Component({
  selector: 'tr [bassin]',
  templateUrl: './one-bassin.component.html',
  styleUrls: ['./one-bassin.component.css']
})
export class OneBassinComponent implements OnInit {
  @Input()
  bassin: Bassin;

  @Output()
  deleteBassin = new EventEmitter<Bassin>();
  constructor(private bassinService: BassinService) { }

  ngOnInit() {
  }

  onDeleteBassin(id: any){
    this.bassinService
      .deleteBassin(this.bassin.id)
      .subscribe(
        data=> this.deleteBassin.emit(this.bassin),
        error => {console.log(error);
        })
  }

}
