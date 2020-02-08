import {Bassin} from "../bassin/bassin";

export interface Secteur{
  id : number;
  nom:string;
  localisation : string;
  bassinList:Array<Bassin>
}
