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
}