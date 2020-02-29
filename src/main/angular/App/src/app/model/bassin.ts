import {Espece} from "./espece";
import {Activity} from "./activity";

export enum Etat {
  propre='propre',
  sale='sale',
}
export interface Bassin{
  id : number;
  numBassin : number;
  capaciteMax : number;
  volumeEau:string;
  etat : Etat;
  especeList:Array<Espece>
  activities:Array<Activity>
}
