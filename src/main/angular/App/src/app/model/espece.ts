import {Animal} from "./animal";

export enum RegimeAlimentaire {
  alguivore='alguivore',
  planctonivore='planctonivore',
  piscivore='piscivore'
}
export interface Espece{
  id : number;
  menacee : number;
  nom:string;
  esperanceVie : string;
  regimeAlimentaire:RegimeAlimentaire;
 // animalList :Array<Animal>
}
