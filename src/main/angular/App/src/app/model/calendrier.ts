import {Employe} from './employe';
import {Activity} from "./activity";

export interface Calendrier{
  id : number;
  date : Date;
  employe :Employe;
  activities :Array<Activity>;
}
