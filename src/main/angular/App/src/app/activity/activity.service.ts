import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../model/activity";

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
  createActivity(activity:Activity,idEmploye:number): Observable<EntityResponseType> {
    return this.httpClient.post<Activity>('/activitiesCreate/'+idEmploye, activity, { observe: 'response' });
  }

  updateActivity(activity: Activity, idResponsable : number): Observable<EntityResponseType> {
      return this.httpClient.post<Activity>('/activities' + '/' + activity.id + '/' + idResponsable, activity, { observe: 'response' });
  }
}
