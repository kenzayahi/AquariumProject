import {Activity} from "./activity";

export interface Calendrier{
  id : number;
  numSemaine: number;
  activities :Array<Activity>;
}
