import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodService {

  private numberSelectUrl = 'http://localhost:1010/getAllActiveNumber';
  private numberActivateUrl = 'http://localhost:1010/activateNumber';

  constructor(private http : HttpClient) { }

  getActiveNumber() : Observable<any>{
    return this.http.get(this.numberSelectUrl);
  }

  activateNumber(customer : any):Observable<any>{
    return this.http.put(this.numberActivateUrl,customer);
  }


}
