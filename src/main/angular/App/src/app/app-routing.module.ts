import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnimalComponent} from './animal/animal.component';
import {EspeceComponent} from './espece/espece.component';
import {EmployeComponent} from "./employe/employe.component";
import {ActivityComponent} from "./activity/activity.component";
import {AnimalEditComponent} from "./animal/edit/animal-edit.component";
import {EspeceEditComponent} from "./espece/edit/espece-edit.component";

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
    path: 'espece',
    component: EspeceComponent
  },
  {
    path: 'espece/edit',
    component: EspeceEditComponent
  },
  {
    path: 'employe',
    component: EmployeComponent
  },
  {
    path: 'activity',
    component: ActivityComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
