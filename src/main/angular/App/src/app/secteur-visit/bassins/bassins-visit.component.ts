import {Component, OnInit} from '@angular/core';
import {SecteurService} from "../../secteur/secteur.service";
import {ActivatedRoute} from "@angular/router";
import {Bassin} from "../../model/bassin";

@Component({
  selector: 'app-bassins',
  templateUrl: './bassins-visit.component.html',
  styleUrls: ['./bassins-visit.component.css']
})
export class BassinsVisitComponent implements OnInit {
  idSecteur:number;
  listBassin: Array<Bassin>;
  constructor(private secteurService : SecteurService,
              private route: ActivatedRoute,) { }
  ngOnInit() {
    this.idSecteur = this.route.snapshot.params['id'];
    this.secteurService.getSecteur(this.idSecteur).subscribe(data => {
        this.listBassin=data.bassinList;
      }
    );
  }

}
