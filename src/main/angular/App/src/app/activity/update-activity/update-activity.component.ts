import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Activity, TypeActivity} from "../../model/activity";
import {Employe} from "../../model/employe";
import {ActivityService} from "../activity.service";
import {EmployeService} from "../../employe/employe.service";
import {DialogActivityComponent} from "../dialog-activity/dialog-activity.component";
import {BassinService} from "../../bassin/bassin.service";
import {Bassin} from "../../model/bassin";

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent implements OnInit {

  type=[ TypeActivity.bilan_veterinaire,TypeActivity.entretien,TypeActivity.nourrissage,TypeActivity.verifier_stock_nouriture];
  id:number;
  formGroup: FormGroup;
  listResponsables:Array<Employe>;
  @Output()
  updateActivity=new EventEmitter<Activity>();
  idEmploye:number;
  employes:Array<Employe>;
  @Output()
  deleteActivity = new EventEmitter<Activity>();
  @Output()
  affectEmploye = new EventEmitter<Boolean>();

  firstDate : Date;
  typeActivity:TypeActivity;
  private bassins: Array<Bassin>;


  constructor(private activityService : ActivityService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private employeService:EmployeService,
              private bassinService:BassinService) {
    this.onGetBassins();
  }

  refreshList(){
    this.activityService.getActivity(this.id).subscribe(data => {
        this.listResponsables=data.responsables;
      }
    );
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.activityService.getBassinFromActivity(this.id).subscribe(

      data2 => {
        console.log("data2"+data2.id);
        this.activityService.getActivity(this.id).subscribe(data => {
            this.listResponsables=data.responsables;
            this.typeActivity=data.type;
            this.formGroup = new FormGroup({
              type: new FormControl(data.type),
              dateDebut: new FormControl(new Date(data.dateDebut).toISOString().substring(0,10)),
              heureDebut : new FormControl(this.printHours(data.dateDebut)),
              heureFin : new FormControl(this.printHours(data.dateFin)),
              accessible: new FormControl(data.accessible),
              bassin:new FormControl(data2.id),
            });
            this.firstDate = data.dateDebut;
            if(this.typeActivity==TypeActivity.verifier_stock_nouriture){
              this.onGetGestionnaire()
            }else{
              this.onGetSimpleEmploye()
            }
          }
        );
      });
  }

  onUpdateActivity() {
    let activity: Activity =  this.formGroup.value;
    activity.id = this.id;

    let debut = new Date(activity.dateDebut);
    let tab = this.formGroup.get('heureDebut').value.split(":");
    debut.setHours(tab[0]);
    debut.setMinutes(tab[1]);
    activity.dateDebut = debut;

    let fin = new Date(activity.dateDebut);
    tab = this.formGroup.get('heureFin').value.split(":");
    fin.setHours(tab[0]);
    fin.setMinutes(tab[1]);
    activity.dateFin = fin;
    let idBassin = this.formGroup.get('bassin').value;
    activity.bassin = null;
    activity.responsables=this.listResponsables;
    this.activityService.updateActivity(activity,idBassin, this.getWeek(this.firstDate), new Date(this.firstDate).getFullYear(), this.getWeek(activity.dateDebut), new Date(activity.dateDebut).getFullYear()).subscribe(
      data => this.updateActivity.emit(activity),
      error => console.log(error)
    );

  }
  onGetSimpleEmploye(){
    this.employeService
      .getSimpleEmployes()
      .subscribe(
        data=>{this.employes=data},
        error => {console.log("errrrrrror"+error);
        })
  }
  onGetGestionnaire(){
    this.employeService
      .getGestionnaireEmployes()
      .subscribe(
        data=>{this.employes=data},
        error => {console.log("errrrrrror"+error);
        })
  }
  onGetBassins(){
    this.bassinService
      .getBassins()
      .subscribe(
        data=>{this.bassins=data;},
        error => {console.log(error);
        })
  }
  affecterEmploye(id:any) :void {
    const  dialogConfig  =  new  MatDialogConfig ( ) ;
    dialogConfig . disableClose  =  true ;
    dialogConfig . id  =  "composant modal" ;
    dialogConfig .height  =  "350 px" ;
    dialogConfig . width  =  "600px" ;
    const dialogRef = this.dialog.open(DialogActivityComponent,{
      width:"350",height:"600",
      data:this.employes,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.idEmploye = result.data;
      this.activityService
        .affecteEmploye(id, this.idEmploye)
        .subscribe(
          data=>{this.affectEmploye.emit(true);
            if(this.typeActivity==TypeActivity.verifier_stock_nouriture){
              this.onGetGestionnaire()
            }else{
              this.onGetSimpleEmploye()
            }
            this.refreshList();
          },
          error => {console.log("errrrrrror"+error)}
        );
    });
  }

  deleteEmployeActivity($event: Employe) {

    let employe = $event;
    this.activityService
      .deleteEmploye(this.id,employe.id)
      .subscribe(
        data=> {
          if(this.typeActivity==TypeActivity.verifier_stock_nouriture){
            this.onGetGestionnaire()
          }else{
            this.onGetSimpleEmploye()
          }
          this.refreshList();

        },
        error => {console.log(error);
        })
  }
  formatDate(nombre : number, chiffre : number) {

    var temp = '' + nombre;
    while ((temp.length < chiffre) && (temp = '0' + temp)) {
    }
    return temp;
  }

  printHours(d: Date) {
    return this.formatDate(new Date(d).getHours(), 2) + ":" + this.formatDate(new Date(d).getMinutes(), 2);
  }


  containsDate(d : Date, begin, end){
    return begin < d && end > d;

  }


  getWeek(date : Date){
    for(let i = 0 ; i < 53; i++){
      let begin = this.getBeginWeek(i, new Date(date).getFullYear());
      let end = this.getEndWeek(begin, i, new Date(date).getFullYear());
      if(this.containsDate(new Date(date), begin, end))
        return i+1;
    }

  }

  getBeginWeek(semaine, annee){
    if(semaine == 0){
      let begin = new Date();
      begin.setFullYear(annee, 0, 1);
      begin.setHours(0);
      begin.setMinutes(0);
      return begin;
    }

    let debut = new Date();
    debut.setUTCFullYear(annee,0,1);
    let firstDay =  debut.getDay();
    let lgth = (8 - firstDay);
    let ajout = (semaine - 1)*7 + (lgth + 1);
    let begin = new Date();
    begin.setFullYear(annee, 0, ajout);
    begin.setHours(0);
    begin.setMinutes(0);
    return begin;
  }

  getEndWeek(begin, semaine, annee){
    if(semaine == 0){
      let firstDay =  begin.getDay();
      let lgth = (8 - firstDay);
      let ajout = (semaine)*7 + (lgth + 1);
      let end = new Date();
      end.setFullYear(annee, 0, ajout-1);
      end.setHours(23);
      end.setMinutes(59);
      return end;
    }
    let debut = new Date();
    debut.setUTCFullYear(annee,0,1);
    let firstDay =  debut.getDay();
    let lgth = (8 - firstDay);
    let ajout = (semaine - 1)*7 + (lgth + 1);
    let end = new Date();
    end.setFullYear(annee,0,ajout+6);
    let fin = new Date();
    fin.setFullYear(annee, 11, 31);
    if(end.getTime() > fin.getTime()) {
      end.setFullYear(annee, 11, 31);
    }
    end.setHours(23);
    end.setMinutes(59);
    return end;

  }

}
