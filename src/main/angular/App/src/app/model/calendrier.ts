import {Employe} from './employe';
import {Activity} from "./activity";

export interface Calendrier{
  id : number;
  employe :Employe;
  activities :Array<Activity>;
}
