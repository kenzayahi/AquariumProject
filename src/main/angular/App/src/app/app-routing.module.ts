import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnimalComponent} from './animal/animal.component';
import {EspeceComponent} from './espece/espece.component';
import {EmployeComponent} from "./employe/employe.component";
import {ActivityComponent} from "./activity/activity.component";
import {AnimalEditComponent} from "./animal/edit/animal-edit.component";
import {EspeceEditComponent} from "./espece/edit/espece-edit.component";
import {UpdateEspeceComponent} from "./espece/update-espece/update-espece.component";
import {UpdateAnimalComponent} from './animal/update-animal/update-animal.component';
import {BassinComponent} from "./bassin/bassin.component";
import {BassinEditComponent} from "./bassin/edit/bassin-edit.component";
import {UpdateBassinComponent} from "./bassin/update-Bassin/update-bassin.component";
import {SecteurComponent} from "./secteur/secteur.component";
import {SecteurEditComponent} from "./secteur/edit/secteur-edit.component";
import {UpdateSecteurComponent} from "./secteur/update-secteur/update-secteur.component";
import {EmployeEditComponent} from './employe/edit/employe-edit.component';
import {UpdateEmployeComponent} from './employe/update-Employe/update-employe.component';
import {ActivityEditComponent} from "./activity/edit/activity-edit.component";
import {UpdateActivityComponent} from "./activity/update-activity/update-activity.component";
import {AuthetificationComponent} from "./authetification/authetification.component";
import {CalendrierComponent} from './calendrier/calendrier.component';
import {CalendrierEditComponent} from './calendrier/edit/calendrier-edit.component';
import {CalendrierUpdateComponent} from "./calendrier/update/calendrier-update.component";
import {AccuielComponent} from "./accuiel/accuiel.component";
import {SecteurVisitComponent} from "./secteur-visit/secteur-visit.component";
import {BassinsVisitComponent} from "./secteur-visit/bassins/bassins-visit.component";
import {AnimauxVisitComponent} from "./secteur-visit/animaux-visit/animaux-visit.component";

const routes: Routes = [
  {
    path: 'authentificate',
    component: AuthetificationComponent
  },
  {
    path: 'animal',
    component: AnimalComponent
  },
  {
    path: 'animal/edit',
    component: AnimalEditComponent
  },
  {
    path: 'animal/update/:id',
    component: UpdateAnimalComponent
  },
  {
    path: 'secteur',
    component: SecteurComponent
  },
  {
    path: 'secteur/edit',
    component: SecteurEditComponent
  },
  {
    path: 'secteur/update/:id',
    component: UpdateSecteurComponent
  },
  {
    path: 'espece',
    component: EspeceComponent
  },
  {
    path: 'espece/edit',
    component: EspeceEditComponent
  },
  {
    path: 'espece/update/:id',
    component: UpdateEspeceComponent
  },
  {
    path: 'employe',
    component: EmployeComponent
  },
  {
    path: 'employe/edit',
    component: EmployeEditComponent
  },
  {
    path: 'employe/update/:id',
    component: UpdateEmployeComponent
  },
  {
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'activity/edit',
    component: ActivityEditComponent
  },
  {
    path: 'activity/update/:id',
    component: UpdateActivityComponent
  },
  {
    path: 'bassin/:role',
    component: BassinComponent
  },
  {
    path: 'bassin/:role/edit',
    component: BassinEditComponent
  },
  {
    path: 'bassin/:role/update/:id',
    component: UpdateBassinComponent
  },
  {
    path: 'calendrier/:idEmploye',
    component: CalendrierComponent
  },
  {
    path: 'calendrier/:idEmploye/edit',
    component: CalendrierEditComponent
  },
  {
    path: 'calendrier/:idEmploye/update/:id',
    component: CalendrierUpdateComponent
  },
  {
    path: 'accueil',
    component: AccuielComponent
  },
  {
    path: 'secteurVisit/true',
    component: SecteurVisitComponent
  },
  {
    path: 'BassinsVisit/:id',
    component: BassinsVisitComponent
  },
  {
    path: 'animauxVisit/:id',
    component: AnimauxVisitComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
