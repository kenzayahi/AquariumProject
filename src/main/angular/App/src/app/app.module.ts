import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AnimalComponent } from './animal/animal.component';
import { EspeceComponent } from './espece/espece.component';
import { HttpClientModule} from "@angular/common/http";
import { EmployeComponent } from './employe/employe.component';
import { ActivityComponent } from './activity/activity.component';
import { MatCardModule} from "@angular/material/card";
import { AnimalEditComponent} from "./animal/edit/animal-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {EspeceEditComponent} from "./espece/edit/espece-edit.component";
import {MatSnackBarModule, MatTableModule} from '@angular/material';
import { OneEspeceComponent } from './espece/one-espece/one-espece.component';
import { UpdateEspeceComponent } from './espece/update-espece/update-espece.component';
import {OneAnimalComponent} from './animal/one-animal/one-animal.component';
import {UpdateAnimalComponent} from './animal/update-animal/update-animal.component';
import { BassinComponent } from './bassin/bassin.component';
import {BassinEditComponent} from "./bassin/edit/bassin-edit.component";
import {OneBassinComponent} from "./bassin/one-bassin/one-bassin.component";
import {UpdateBassinComponent} from "./bassin/update-Bassin/update-bassin.component";
import {EmployeEditComponent} from './employe/edit/employe-edit.component';
import {OneEmployeComponent} from './employe/one-employe/one-employe.component';
import {UpdateEmployeComponent} from './employe/update-Employe/update-employe.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AnimalComponent,
    AnimalEditComponent,
    EspeceComponent,
    EspeceEditComponent,
    EmployeComponent,
    ActivityComponent,
    OneEspeceComponent,
    UpdateEspeceComponent,
    OneAnimalComponent,
    UpdateAnimalComponent,
    BassinComponent,
    BassinEditComponent,
    OneBassinComponent,
    UpdateBassinComponent,
    EmployeEditComponent,
    OneEmployeComponent,
    UpdateEmployeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
