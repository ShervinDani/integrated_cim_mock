import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanretriveService {

  getAllPlanUrl : string = "http://localhost:1010/getallplans";

  constructor(private http : HttpClient) { }

  getAllPlans() : Observable<any>{
    return this.http.get(this.getAllPlanUrl);
  }

}
