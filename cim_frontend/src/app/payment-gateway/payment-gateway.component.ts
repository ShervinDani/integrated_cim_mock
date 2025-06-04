import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
 
@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="payment-wrapper" *ngIf="planAmount !== null; else loadingTemplate">
      <div class="payment-card">
        <h2>Secure Payment</h2>
        <p class="plan-id">You're paying for <strong>Plan ID: {{ planId }}</strong></p>
 
        <div class="amount-box">
          <label>Total Amount</label>
          <div class="amount">₹{{ planAmount }}</div>
        </div>
 
        <div class="payment-methods">
          <label>Select Payment Method</label>
          <div class="methods">
            <button [class.selected]="selectedMethod === 'card'" (click)="selectMethod('card')">💳 Card</button>
            <button [class.selected]="selectedMethod === 'upi'" (click)="selectMethod('upi')">🏦 UPI</button>
            <button [class.selected]="selectedMethod === 'cod'" (click)="selectMethod('cod')">📦 Wallet</button>
          </div>
        </div>
 
        <button class="pay-btn" (click)="makePayment()" [disabled]="planAmount === 0">Pay Now</button>
      </div>
    </div>
 
    <ng-template #loadingTemplate>
      <p>Loading plan details...</p>
    </ng-template>
  `,
  styles: [`
    .payment-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 90vh;
      background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
      padding: 20px;
      position: relative;
    }
 
    .payment-card {
      background-color: #fff;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 420px;
      text-align: center;
    }
 
    h2 {
      margin-bottom: 12px;
      color: #1a237e;
    }
 
    .plan-id {
      font-size: 16px;
      margin-bottom: 20px;
    }
 
    .amount-box {
      margin: 20px 0;
      font-size: 18px;
    }
 
    .amount {
      font-size: 24px;
      color: #2e7d32;
      font-weight: bold;
      margin-top: 4px;
    }
 
    .payment-methods label {
      font-weight: 500;
      margin-bottom: 8px;
      display: block;
    }
 
    .methods {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
    }
 
    .methods button {
      padding: 10px 14px;
      border-radius: 8px;
      border: 2px solid transparent;
      background-color: #e3f2fd;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
    }
 
    .methods button:hover {
      background-color: #bbdefb;
    }
 
    .methods .selected {
      border-color: #1e88e5;
      background-color: #90caf9;
    }
 
    .pay-btn {
      margin-top: 25px;
      background-color: #1a237e;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      width: 100%;
      transition: background-color 0.3s ease;
    }
 
    .pay-btn:hover {
      background-color: #283593;
    }
  `]
})
export class PaymentGatewayComponent implements OnInit {
  planId: string = '';
  planAmount: number | null = null;
  selectedMethod: string = 'card';
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}
 
  ngOnInit() {
    this.planId = this.route.snapshot.paramMap.get('planId') || '';
    if (this.planId) {
      this.http.get<any>(`http://localhost:1010/getplan/${this.planId}`).subscribe({
        next: (plan) => {
          this.planAmount = plan?.price || 0;
        },
        error: (err) => {
          console.error('Failed to fetch plan', err);
          this.planAmount = 0;
        }
      });
    } else {
      this.planAmount = 0;
    }
  }
 
  selectMethod(method: string) {
    this.selectedMethod = method;
  }
 
  makePayment() {
    this.showToast('✅ Payment Successful!');
    console.log("hii")
    setTimeout(() => {
      this.router.navigate(['/view-profile']);
    }, 3000);
  }
 
  showToast(msg: string) {
  const toast = document.createElement('div');
  toast.className = 'toast-info';
  toast.textContent = msg;
 
  // Add animation class
  toast.style.position = 'fixed';
  toast.style.top = '30px';
  toast.style.right = '20px';
  toast.style.zIndex = '10000';
  toast.style.opacity = '0';
  toast.style.padding = '14px 24px';
  toast.style.borderRadius = '12px';
  toast.style.fontSize = '16px';
  toast.style.color = '#fff';
  toast.style.background = 'linear-gradient(135deg, #2196f3, #21cbf3)';
  toast.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
  toast.style.fontWeight = '500';
  toast.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  toast.style.transform = 'translateY(-20px)';
 
  document.body.appendChild(toast);
 
  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
 
  // Animate out and remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 500);
  }, 3000);
}
 
}
 