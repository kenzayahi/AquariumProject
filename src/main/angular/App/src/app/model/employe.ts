import {Bassin} from "./bassin";

export interface Employe{
  id : number;
  nom:string;
  numSecurite : number;
  prenom:string;
  adress : string;
  dateNaissance:Date
  email:string;
  password:string;
  bassinsresponsable: Array<Bassin>;
}


