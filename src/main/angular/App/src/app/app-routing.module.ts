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

const routes: Routes = [
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
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'bassin',
    component: BassinComponent
  },
  {
    path: 'bassin/edit',
    component: BassinEditComponent
  },
  {
    path: 'bassin/update/:id',
    component: UpdateBassinComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
