import {Employe} from "./employe";
export enum TypeActivity {
  nourrissage='nourrissage',
  entretien='entretien',
  bilan ='bilan'
}
export interface Activity{
  id : number;
  dateDebut : Date;
  dateFin : Date;
  type : TypeActivity;
  accessible : boolean;
  responsable : Employe;
}
