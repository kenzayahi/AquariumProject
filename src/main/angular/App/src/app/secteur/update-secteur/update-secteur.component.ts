import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Secteur} from "../../model/secteur";
import {SecteurService} from "../secteur.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BassinService} from "../../bassin/bassin.service";
import {Bassin} from "../../model/bassin";
import {DialogSecteurComponent} from "../dialog-secteur/dialog-secteur.component";

@Component({
  selector: 'app-update-secteur',
  templateUrl: './update-secteur.component.html',
  styleUrls: ['./update-secteur.component.css']
})
export class UpdateSecteurComponent implements OnInit {

  id:number;
  formGroup: FormGroup;
  @Output()
  updateSecteur=new EventEmitter<Secteur>();
  @Output()
  affectBassin = new EventEmitter<Boolean>();
  bassins: Array<Bassin>;
  idBassin: number;
  private listBassin: Array<Bassin>;

  constructor(private secteurService : SecteurService,
              private route: ActivatedRoute,
              protected router: Router,
              private bassinService:BassinService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.secteurService.getSecteur(this.id).subscribe(data => {
        this.listBassin=data.bassinList;
        this.formGroup = new FormGroup({
          nom: new FormControl(data.nom),
          localisation: new FormControl(data.localisation),
        });
      }
    );
    this.onGetBassin();
  }
  onUpdateSecteur() {
    let secteur: Secteur =  this.formGroup.value;
    secteur.id = this.id;
    secteur.bassinList=this.listBassin;
    this.secteurService.updateSecteur(secteur).subscribe(
      data => {this.updateSecteur.emit(secteur);this.router.navigate(['/secteur'])},
      error => console.log(error)
    );
  }
  affecterBassin(id:any) :void {
    const  dialogConfig  =  new  MatDialogConfig ( ) ;
    dialogConfig . disableClose  =  true ;
    dialogConfig . id  =  "composant modal" ;
    dialogConfig .height  =  "350 px" ;
    dialogConfig . width  =  "600px" ;
    const dialogRef = this.dialog.open(DialogSecteurComponent,{
      width:"350",height:"600",
      data:this.bassins,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.idBassin = result.data;
      this.secteurService
        .affecteBassin(id, this.idBassin)
        .subscribe(
          data=>{this.affectBassin.emit(true);
          console.log("secteeeeeer"+data);
            this.onGetBassin()
            this.refreshList();
          },
          error => {console.log("errrrrrror"+error)}
        );
    });
  }

  refreshList(){
    this.secteurService.getSecteur(this.id).subscribe(data => {
        this.listBassin=data.bassinList;
      }
    );
  }
  onGetBassin(){
    this.bassinService
      .getBassins()
      .subscribe(
        data=>{this.bassins=data;console.log(data)},
        error => {console.log(error);
        })
  }

  deleteBassinSecteur($event: Bassin) {

    let bassin = $event;
    this.secteurService
      .deleteBassin(this.id,bassin.id)
      .subscribe(
        data=> {
          this.onGetBassin();
          this.refreshList();

        },
        error => {console.log(error);
        })
  }
}
