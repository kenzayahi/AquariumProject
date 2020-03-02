import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Employe, RoleEmploye} from "../model/employe";
import {Router} from "@angular/router";
import {NavItem} from "./nav-item";

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

  @Input()
  isVisiteur:boolean;

  isGestionnaire= false;
  isSimpleEmpoye= false;
  isResponsableBassin=false;
  nom:string;
  prenom:string;
  role:string;
  idEmploye:number;
  navItems: NavItem[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private route:Router) {}
  ngOnInit() {
    this.route.navigate(['']);
    if(this.employe==undefined){
      this.isVisiteur=true;
    }else {
      this.role=this.employe.roleEmploye;
      this.nom=this.employe.nom;
      this.prenom=this.employe.prenom;
      this.idEmploye=this.employe.id;

      if (this.role == RoleEmploye.gestionnaire) {
        this.isGestionnaire = true;
      } else if (this.role == RoleEmploye.simpleemploye) {
        this.isSimpleEmpoye = true;
      } else if (this.role == RoleEmploye.responsablebassin) {
        this.isResponsableBassin = true;
      }
    }
    this.nav();
  }

  desconnect() {
    this.disconnectEvent.emit(true);
  }
  nav(){
    if(this.isGestionnaire){
      this.navGestionnaire();
    }else if(this.isSimpleEmpoye){
      this.navSimplEmploye();
    }else if(this.isResponsableBassin){
      this.navResponsable();
    }else if(this.isVisiteur) {
      this.navVisiteur();
    }
  }
  navGestionnaire(){
    this.navItems = [
      {
        displayName: 'Accueil',
        iconName: 'home_work',
        children: [
          {
            displayName: 'Accueil',
            iconName: 'home_work',
            route: '/',
          },
          {
            displayName: 'Secteur',
            iconName: 'pool',
            route: '/secteurVisit',
          },
          {
            displayName: 'Espèce',
            iconName: 'adb',
            route: '/especeVisiteur',
          },
        ]
      },
      {
        displayName: 'Espace Gestionnaire',
        iconName: 'people',
        children: [
          {
            displayName: 'Gestion Secteur',
            iconName: 'pool',
            route: '/secteur',
          },
          {
            displayName: 'Gestion Bassin',
            iconName: 'directions_boat',
            route: '/bassin/'+this.role,
          },
          {
            displayName: 'Gestion Employe',
            iconName: 'people',
            route: '/employe',
          },
          {
            displayName: 'Activity',
            iconName: 'event_note',
            route: '/activity',
          },
          {
            displayName: 'Calendrier',
            iconName: 'calendar_today\n',
            route: '/calendrier/'+this.idEmploye,
          },

        ]
      }
    ];
  }
  navResponsable(){
    this.navItems = [
      {
        displayName: 'Accueil',
        iconName: 'home_work',
        children: [
          {
            displayName: 'Accueil',
            iconName: 'group',
            route: '/',
          },
          {
            displayName: 'Secteur',
            iconName: 'pool',
            route: '/secteurVisit',
          },
          {
            displayName: 'Espèce',
            iconName: 'adb',
            route: '/especeVisiteur',
          },
        ]
      },
      {
        displayName: 'Espace Responsable',
        iconName: 'people',
        children: [
          {
            displayName: 'Gestion Especes',
            iconName: 'adb',
            route: '/espece',
          },
          {
            displayName: 'Gestion Animal',
            iconName: 'settings',
            route: '/animal',
          },
          {
            displayName: 'Calendrier',
            iconName: 'calendar_today',
            route: '/calendrier/'+this.idEmploye,
          },
        ]
      }
    ];
  }
  navSimplEmploye(){
    this.navItems = [
      {
        displayName: 'Accueil',
        iconName: 'home_work',
        children: [
          {
            displayName: 'Accueil',
            iconName: 'home_work',
            route: '/',
          },
          {
            displayName: 'Secteur',
            iconName: 'pool',
            route: '/secteurVisit',
          },
          {
            displayName: 'Espèce',
            iconName: 'adb',
            route: '/especeVisiteur',
          },
        ]
      },
      {
        displayName: 'Espace Employe',
        iconName: 'people',
        children: [
          {
            displayName: 'Calendrier',
            iconName: 'calendar_today',
            route: '/calendrier/'+this.idEmploye,
          },
        ]
      }
    ];

  }

  navVisiteur(){
    this.navItems = [
      {
        displayName: 'Accueil',
        iconName: 'home_work',
        children: [
          {
            displayName: 'Accueil',
            iconName: 'home_work',
            route: '/',
          },
          {
            displayName: 'Secteur',
            iconName: 'pool',
            route: '/secteurVisit',
          },
          {
            displayName: 'Espèce',
            iconName: 'adb',
            route: '/especeVisiteur',
          },
        ]
      },
    ];

  }
}
