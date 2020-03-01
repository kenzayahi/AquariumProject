import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../model/activity";
import {Bassin} from "../model/bassin";
import {Espece} from "../model/espece";

type EntityResponseType = HttpResponse<Activity>;

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient:HttpClient) { }

  getActivities () : Observable<Array<Activity>> {
    return this.httpClient.get<Array<Activity>>('/activities');
  }

  getActivity(id: number) : Observable<Activity> {
    return this.httpClient.get<Activity>('/activities/' + id);
  }

  deleteActivity(id: number, numSemaine : number, annee : number): Observable<EntityResponseType> {
    return this.httpClient.delete<Activity>('/activities/' + id + '/' + numSemaine + '/' + annee, { observe: 'response' });
  }
  createActivity(activity:Activity,idBassin:number, numSemaine : number, annee : number): Observable<EntityResponseType> {
    return this.httpClient.post<Activity>('/activitiesCreate/'+idBassin + '/'+ numSemaine+ '/' + annee, activity, { observe: 'response' });
  }

  updateActivity(activity: Activity,idBassin:number, oldWeek : number, oldYear : number, newWeek : number, newYear : number): Observable<EntityResponseType> {

    return this.httpClient.post<Activity>('/activities' + '/' + activity.id +"/"+idBassin + '/' + oldWeek + '/' + oldYear + '/' + newWeek + '/' + newYear, activity, { observe: 'response' });
  }
  affecteEmploye(idActivity: number,idEmploye:number) : Observable<Array<Activity>> {
    return this.httpClient.get<Array<Activity>>('/activitiesResponsable/'+ idActivity+'/'+idEmploye);
  }
  deleteEmploye(idActivity: number,idEmploye:number) : Observable<Array<Activity>> {
    return this.httpClient.get<Array<Activity>>('/deleteResponsable/'+ idActivity+'/'+idEmploye);
  }

  getBassinFromActivity(id: number): Observable<Bassin> {
    return this.httpClient.get<Bassin>('/activity_get_bassin/' + id);
  }
}
