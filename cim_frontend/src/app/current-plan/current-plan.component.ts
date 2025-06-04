import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-current-plan',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="currentPlan" class="plan-card">
      <h3>Your Current Plan</h3>
      <div class="plan-detail">
        <p><strong>📛 Plan Name:</strong> {{ currentPlan.name }}</p>
        <p><strong>📝 Description:</strong> {{ currentPlan.description }}</p>
        <p><strong>💰 Price:</strong> ₹{{ currentPlan.price }}</p>
        <p><strong>📶 Data Limit:</strong> {{ currentPlan.dataLimit }} GB</p>
        <p><strong>📨 SMS Limit:</strong> {{ currentPlan.smsLimit }}</p>
        <p><strong>📞 Voice Limit:</strong> {{ currentPlan.voiceLimit }} minutes</p>
        <p><strong>📅 Validity:</strong> {{ currentPlan.expiryDate }} days</p>
        <p><strong>🔖 Type:</strong> {{ currentPlan.type }}</p>
      </div>
    </div>

    <div *ngIf="!currentPlan && !error" class="loading">Loading current plan...</div>
    <div *ngIf="error" class="error">{{ error }}</div>
  `,
  styles: [`
    .plan-card {
      background:#ffe0b2;
      border-radius: 16px;
      padding: 24px;
      max-width: 600px;
      margin: 24px auto;
    }

    h3 {
      color: #880e4f;
      font-size: 2rem;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .plan-detail p {
      font-size: 1.1rem;
      margin: 8px 0;
      color: inherit;
    }

    .plan-detail p strong {
      font-weight: 600;
      color: inherit;
    }

    .loading {
      text-align: center;
      font-style: italic;
      color: #616161;
      margin-top: 30px;
    }

    .error {
      text-align: center;
      color: red;
      font-weight: bold;
      margin-top: 30px;
    }
  `]
})
export class CurrentPlanComponent implements OnInit {
  currentPlan: any = null;
  error: string = '';

  constructor(private http: HttpClient, private customerService: CustomerService) {}

  ngOnInit(): void {
    const customerId = this.customerService.getCustomerId();
    const url = `http://localhost:1010/users/getUserPlan/${customerId}`;
    
    this.http.get(url).subscribe({
      next: (plan) => {
        this.currentPlan = plan;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load current plan.';
      }
    });
  }
}
