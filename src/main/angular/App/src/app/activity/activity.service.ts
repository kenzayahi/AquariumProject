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

  deleteActivity(id: number): Observable<EntityResponseType> {
    return this.httpClient.delete<Activity>('/activities/' + id, { observe: 'response' });
  }
  createActivity(activity:Activity,idBassin:number): Observable<EntityResponseType> {
    return this.httpClient.post<Activity>('/activitiesCreate/'+idBassin, activity, { observe: 'response' });
  }

  updateActivity(activity: Activity,idBassin:number): Observable<EntityResponseType> {
      return this.httpClient.post<Activity>('/activities' + '/' + activity.id +"/"+idBassin, activity, { observe: 'response' });
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
