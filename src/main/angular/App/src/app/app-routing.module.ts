import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnimalComponent} from './animal/animal.component';
import {EspeceComponent} from './espece/espece.component';


const routes: Routes = [
  {
    path: 'animal',
    component: AnimalComponent
  },
  {
    path: 'espece',
    component: EspeceComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
