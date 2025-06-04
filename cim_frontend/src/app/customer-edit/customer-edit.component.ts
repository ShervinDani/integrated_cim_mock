import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { NotificationService } from '../notification.service'; // ✅ import NotificationService

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="dashboard" *ngIf="customerForm">
      <h2>Update Customer Details</h2>
      <form [formGroup]="customerForm" (ngSubmit)="updateCustomer()">
        <label>Email:</label>
        <input type="email" formControlName="email" />

        <label>Address:</label>
        <input type="text" formControlName="address" />

        <button type="submit" [disabled]="customerForm.invalid">Update</button>
      </form>

      <p *ngIf="message" class="message">{{ message }}</p>
      <p *ngIf="error" class="error">{{ error }}</p>
    </div>
  `,
  styles:  [`
    .dashboard {
      max-width: 700px;
      margin: auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    input[type="text"],
    input[type="email"] {
      padding: 8px;
      font-size: 1rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #7da6d9;
      cursor: not-allowed;
    }
    button:hover:enabled {
      background-color: #0056b3;
    }
    .message {
      color: green;
      margin-top: 15px;
    }
    .error {
      color: red;
      margin-top: 15px;
    }
  `]
})
export class CustomerEditComponent implements OnInit {
  customer: any = {};
  customerForm!: FormGroup;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private customerService: CustomerService,
    private notificationService: NotificationService 
  ) {}

  ngOnInit(): void {
    const customerId = this.customerService.getCustomerId();

    this.http.get(`http://localhost:1010/users/getCustomerDetails/${customerId}`).subscribe({
      next: (data: any) => {
        this.customer = data;
        this.customerForm = this.fb.group({
          email: [data.email],
          address: [data.address]
        });
      },
      error: err => {
        console.error('Failed to fetch customer details:', err);
        this.error = 'Failed to load customer details.';
      }
    });
  }

  updateCustomer(): void {
  this.error = '';
  this.message = '';

  const updatedCustomer = {
    ...this.customer,
    ...this.customerForm.value
  };

  this.http.put('http://localhost:1010/users/updateCustomer', updatedCustomer, { responseType: 'text' }).subscribe({
    next: (res) => {
      this.message = res;
      this.notificationService.showToast(res); // ✅ show toast only
      setTimeout(() => this.message = '', 3000);
    },
    error: (err) => {
      console.error('Failed to update customer:', err);
      this.error = 'Failed to update customer details.';
    }
  });
}
}
