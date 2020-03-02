import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bassin} from "../../../model/bassin";

@Component({
  selector: 'tr [bassinSecteur]',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.css']
})
export class secteurBassinComponent implements OnInit {
  @Input()
  bassinSecteur: Bassin;

  @Output()
  deleteBassinInSecteur = new EventEmitter<Bassin>();
  constructor() { }

  ngOnInit() {
  }

  onDeleteBassin(id: any) {
    this.deleteBassinInSecteur.emit(this.bassinSecteur);
  }


}
