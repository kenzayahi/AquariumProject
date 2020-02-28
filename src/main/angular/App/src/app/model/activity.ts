import {Employe} from "./employe";
export enum TypeActivity {
  nourrissage='nourrissage',
  entretien='entretien',
  bilan_veterinaire ='bilan_veterinaire',
  verifier_stock_nouriture ='verifier_stock_nouriture',

}
export interface Activity{
  id : number;
  dateDebut : Date;
  dateFin : Date;
  type : TypeActivity;
  accessible : boolean;
  responsables : Array<Employe>;
}
