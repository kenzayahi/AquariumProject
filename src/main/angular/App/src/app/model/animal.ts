import {Espece} from "./espece";

export enum Sexe {
  male='male',
  femmelle='femmelle'
}
export interface Animal{
  id : number;
  nom : string;
  sexe: Sexe;
  espece : Espece;
  dateArrivee :Date;
  dateDepart :Date;
  signedistinctif:string
}
