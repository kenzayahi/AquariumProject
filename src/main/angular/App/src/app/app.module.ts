import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {AnimalComponent} from './animal/animal.component';
import {EspeceComponent} from './espece/espece.component';
import {HttpClientModule} from "@angular/common/http";
import {EmployeComponent} from './employe/employe.component';
import {ActivityComponent} from './activity/activity.component';
import {MatCardModule} from "@angular/material/card";
import {AnimalEditComponent} from "./animal/edit/animal-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {EspeceEditComponent} from "./espece/edit/espece-edit.component";
import {MatSnackBarModule, MatTableModule} from '@angular/material';
import {OneEspeceComponent} from './espece/one-espece/one-espece.component';
import {UpdateEspeceComponent} from './espece/update-espece/update-espece.component';
import {OneAnimalComponent} from './animal/one-animal/one-animal.component';
import {UpdateAnimalComponent} from './animal/update-animal/update-animal.component';
import {BassinComponent} from './bassin/bassin.component';
import {BassinEditComponent} from "./bassin/edit/bassin-edit.component";
import {OneBassinComponent} from "./bassin/one-bassin/one-bassin.component";
import {UpdateBassinComponent} from "./bassin/update-Bassin/update-bassin.component";
import {SecteurComponent} from './secteur/secteur.component';
import {SecteurEditComponent} from './secteur/edit/secteur-edit.component';
import {OneSecteurComponent} from './secteur/one-secteur/one-secteur.component';
import {UpdateSecteurComponent} from './secteur/update-secteur/update-secteur.component';
import {EmployeEditComponent} from './employe/edit/employe-edit.component';
import {OneEmployeComponent} from './employe/one-employe/one-employe.component';
import {UpdateEmployeComponent} from './employe/update-Employe/update-employe.component';
import {ActivityEditComponent} from './activity/edit/activity-edit.component';
import {OneActivityComponent} from './activity/one-activity/one-activity.component';
import {UpdateActivityComponent} from './activity/update-activity/update-activity.component';
import {AuthetificationComponent} from './authetification/authetification.component';
import {DialogOverviewComponent} from './bassin/dialog-overview/dialog-overview.component';
import {MatDialogModule} from "@angular/material/dialog";
import {EspeceBassinComponent} from "./bassin/update-Bassin/one-espece/one-espece.component";
import {DialogOverviewEmployeComponent} from './employe/dialog-overview-employe/dialog-overview-employe.component';
import {OneBassinModifComponent} from './employe/update-Employe/one-bassin-modif/one-bassin-modif.component';
import {CalendrierComponent} from "./calendrier/calendrier.component";
import {OneCalendrierComponent} from "./calendrier/one-calendrier/one-calendrier.component";
import {CalendrierUpdateComponent} from "./calendrier/update/calendrier-update.component";
import {CalendrierEditComponent} from "./calendrier/edit/calendrier-edit.component";
import {DialogActivityComponent} from "./activity/dialog-activity/dialog-activity.component";
import {activityResponsableComponent} from "./activity/update-activity/one-responsable/one-activity.component";
import {DialogSecteurComponent} from "./secteur/dialog-secteur/dialog-secteur.component";
import {secteurBassinComponent} from "./secteur/update-secteur/one-bassin/one-activity.component";
import {NavVisiteurComponent} from './nav-visiteur/nav-visiteur.component';
import {SecteurVisitComponent} from './secteur-visit/secteur-visit.component';
import {BassinsVisitComponent} from './secteur-visit/bassins/bassins-visit.component';
import {AnimauxVisitComponent} from './secteur-visit/animaux-visit/animaux-visit.component';
import {AccueilComponent} from "./accueil/accueil.component";
import { EspeceVisiteurComponent } from './espece-visiteur/espece-visiteur.component';
import {AnimauxEspeceComponent} from "./espece-visiteur/animaux-espece/animaux-espece.component";

// @ts-ignore
@NgModule({
  exports: [DialogOverviewComponent, DialogOverviewEmployeComponent,DialogActivityComponent],
  entryComponents: [DialogOverviewComponent, DialogOverviewEmployeComponent,DialogActivityComponent],
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
    SecteurComponent,
    SecteurEditComponent,
    OneSecteurComponent,
    UpdateSecteurComponent,
    UpdateBassinComponent,
    EmployeEditComponent,
    OneEmployeComponent,
    UpdateEmployeComponent,
    ActivityEditComponent,
    OneActivityComponent,
    UpdateActivityComponent,
    AuthetificationComponent,
    DialogOverviewComponent,
    EspeceBassinComponent,
    DialogOverviewEmployeComponent,
    OneBassinModifComponent,
    CalendrierComponent,
    CalendrierEditComponent,
    CalendrierUpdateComponent,
    OneCalendrierComponent,
    DialogActivityComponent,
    activityResponsableComponent,
    DialogSecteurComponent,
    secteurBassinComponent,
    AccueilComponent,
    NavVisiteurComponent,
    SecteurVisitComponent,
    BassinsVisitComponent,
    AnimauxVisitComponent,
    EspeceVisiteurComponent,
    AnimauxEspeceComponent
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
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
