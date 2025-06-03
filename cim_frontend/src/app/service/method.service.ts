import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodService {

  private numberSelectUrl = 'http://localhost:1010/getAllActiveNumber';
  private numberActivateUrl = 'http://localhost:1010/activateNumber';
  private getUser = 'http://localhost:1010/api/customers';

  private getRetail='http://localhost:1010/api/retailers';
  private getPlans='http://localhost:1010/getallplans';
  private baseUrl = 'http://localhost:1010/api/admin';

  constructor(private http : HttpClient) { }

  getActiveNumber() : Observable<any>{
    return this.http.get(this.numberSelectUrl);
  }

  activateNumber(customer : any):Observable<any>{
    return this.http.put(this.numberActivateUrl,customer);
  }

  getAllUsers() : Observable<any> {
    return this.http.get(this.getUser);
  }
  getRetailer():Observable<any> {
    return this.http.get(this.getRetail);
  }
   getPlan():Observable<any> {
    return this.http.get(this.getPlans);
  }
   updateCustomerStatus(id: number, status: string) {
  return this.http.put(`${this.baseUrl}/${id}/status`, null, {
    params: { active: status },
    responseType: 'text'
  });
}

}
