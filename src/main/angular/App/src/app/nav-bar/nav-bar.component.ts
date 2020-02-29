import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Employe, RoleEmploye} from "../model/employe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Output()
  private disconnectEvent=new EventEmitter<boolean>();
  @Input()
  employe:Employe;

  isGestionnaire= false;
  isSimpleEmpoye= false;
  isResponsableBassin=false;
  nom:string;
  prenom:string;
  role:string;
  idEmploye:number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private route:Router) {}
  ngOnInit() {
    this.route.navigate(['']);
    this.role=this.employe.roleEmploye;
    this.nom=this.employe.nom;
    this.prenom=this.employe.prenom;
    this.idEmploye=this.employe.id;
    console.log(this.idEmploye);
    if(this.role==RoleEmploye.gestionnaire){
      this.isGestionnaire=true;
    }else if(this.role==RoleEmploye.simpleemploye){
      this.isSimpleEmpoye=true;
    }else if(this.role==RoleEmploye.responsablebassin){
      this.isResponsableBassin=true;
    }
  }

  desconnect() {
    this.disconnectEvent.emit(true);
  }
}
