import {Activity} from "./activity";

export interface Calendrier{
  annee: number;
  id : number;
  numSemaine: number;
  activities :Array<Activity>;
}
