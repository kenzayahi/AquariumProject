import {Espece} from "../espece/espece";

export interface Animal{
  id : number;
  nom : string;
  sexe:string;
  espece : Espece;
}
