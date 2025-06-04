import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customerId:number = 22; 

  constructor(private http: HttpClient) {
    this.customerId = Number(localStorage.getItem("customerId"));
  }

  getCustomerId(): number {
    return this.customerId;
  }

  getCustomerDetails(): Observable<any> {
    return this.http.get(`http://localhost:1010/users/getCustomerDetails/${this.customerId}`);
  }
}
