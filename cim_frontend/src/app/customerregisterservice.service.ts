import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerregisterserviceService {

  private customerRegister1Url = 'http://localhost:1010/registerNewCustomer';
  private customerRegister2Url = 'http://localhost:1010/uploadDocument';

  constructor(private http : HttpClient) { }

  postCustomerRegister1(data : any) : Observable<any> {
    return this.http.post(this.customerRegister1Url, data);
  }

  postCustomerRegister2(data : any) : Observable<any> {
    return this.http.post(this.customerRegister2Url, data);
  }

}
