import {Bassin} from "./bassin";

export enum RoleEmploye {
  gestionnaire = 'gestionnaire',
  simpleemploye = 'simpleemploye',
  responsablebassin='responsablebassin',

}
export interface Employe{
  id : number;
  nom:string;
  numSecurite : number;
  prenom:string;
  adress : string;
  dateNaissance:Date
  email:string;
  password:string;
  roleEmploye:RoleEmploye;
  bassinsresponsable: Array<Bassin>;
}


