import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="dashboard" *ngIf="customer; else loadingOrError">
      <div class="profile-card">
        
        <div>
          <h3>{{ customer.firstName }} {{ customer.lastName }}</h3>
          <p><strong>DOB:</strong> {{ customer.dateOfBirth }}</p>
          <p><strong>Gender:</strong> {{ customer.gender }}</p>
          <p><strong>Phone:</strong> {{ customer.phoneNumber }}</p>
          <p><strong>Email:</strong> {{ customer.email }}</p>
          <p><strong>Address:</strong> {{ customer.address }}</p>
        </div>
      </div>
    </div>

    <ng-template #loadingOrError>
      <p *ngIf="error" class="error">{{ error }}</p>
      <p *ngIf="!error" class="loading">Loading customer details...</p>
    </ng-template>
  `,
  styles: [`
    .dashboard {
      max-width: 700px;
      margin: auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .profile-card {
      display: flex;
      align-items: center;
      gap: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .profile-img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }
    .error {
      color: red;
      text-align: center;
      margin-top: 20px;
    }
    .loading {
      text-align: center;
      margin-top: 20px;
      font-style: italic;
      color: #666;
    }
  `]
})
export class CustomerViewComponent implements OnInit {
  customer: any;
  error = '';

  constructor(private http: HttpClient, private customerService: CustomerService) {}

  ngOnInit(): void {
    const customerId = this.customerService.getCustomerId();
    console.log(customerId + "Hello");
    this.http.get(`http://localhost:1010/users/getCustomerDetails/${customerId}`).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => {
        console.error('Failed to load customer details:', err);
        this.error = 'Failed to load customer details.';
      }
    });
  }
}
