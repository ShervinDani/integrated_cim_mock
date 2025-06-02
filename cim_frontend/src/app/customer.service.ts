import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerId = 22; 

  constructor(private http: HttpClient) {}

  getCustomerId(): number {
    return this.customerId;
  }

  getCustomerDetails(): Observable<any> {
    return this.http.get(`http://localhost:1010/getCustomerDetails/${this.customerId}`);
  }
}
