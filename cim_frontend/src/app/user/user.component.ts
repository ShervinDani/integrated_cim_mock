import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CurrentPlanComponent } from '../current-plan/current-plan.component';
import { AllPlansComponent } from '../all-plans/all-plans.component';
import { CallHistoryComponent } from '../call-history/call-history.component';
import { NotificationComponent } from '../notification/notification.component';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { CustomerViewComponent } from '../customer-view/customer-view.component';
import { NotificationPageComponent } from '../notificationpage/notificationpage.component';
import { CustomerService } from '../customer.service';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
imports: [
    CommonModule,
    CurrentPlanComponent,
    AllPlansComponent,
    CallHistoryComponent,
    NotificationComponent,
    CustomerEditComponent,
    CustomerViewComponent,
    NotificationPageComponent
  ],
  template: `
    <nav class="navbar">
      <div class="brand">📶 CelTel</div>

      <div class="nav-right">
        <button class="nav-btn" (click)="showSection('viewProfile')">View Profile</button>
        <button class="nav-btn" (click)="showSection('updateProfile')">Update Profile</button>

        <div class="profile-section">
          <img
            class="profile-pic"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
          />
          <span class="user-name" *ngIf="customer">{{ customer.firstName }}</span>
          <app-notification></app-notification>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="left-panel">
        <div *ngIf="router.url != '/notifications'" class="sidebar-buttons">
          <button class="left-btn" (click)="showSection('plans')">View All Plans</button>
          <button class="left-btn" (click)="showSection('history')">Call History</button>
        </div>

       <div *ngIf="router.url != '/notifications'" class="section-display">
  <app-all-plans *ngIf="selectedSection === 'plans'"></app-all-plans>
  <app-call-history *ngIf="selectedSection === 'history'"></app-call-history>
  <app-customer-view *ngIf="selectedSection === 'viewProfile'"></app-customer-view>
  <app-customer-edit *ngIf="selectedSection === 'updateProfile'"></app-customer-edit>
</div>
      <app-notification-page *ngIf="router.url === '/notifications'"></app-notification-page>
      </div>

      <div class="right-panel">
        <app-current-plan></app-current-plan>
      </div>
    </div>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #0d47a1;
      padding: 12px 24px;
      color: white;
      font-weight: 600;
      font-size: 1.4rem;
    }

    .brand {
      user-select: none;
      font-size: 1.6rem;
    }

    app-notification {
      position: relative;
      cursor: pointer;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .nav-btn {
      background: transparent;
      border: 2px solid white;
      border-radius: 6px;
      padding: 6px 12px;
      color: white;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
      user-select: none;
    }

    .nav-btn:hover {
      background-color: #1976d2;
    }

    .profile-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .profile-pic {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid white;
      object-fit: cover;
    }

    .user-name {
      font-size: 1.1rem;
      color: #ffd600;
    }

    .container {
      display: flex;
      gap: 24px;
      padding: 24px;
      height: calc(100vh - 70px);
      box-sizing: border-box;
    }

    .left-panel {
      flex: 2;
      background: #f9fbff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(13, 71, 161, 0.2);
      padding: 16px;
      overflow-y: auto;
    }

    .right-panel {
      flex: 1;
      background: #fff;
      border-radius: 12px;
      padding: 24px;
      user-select: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    @media (max-width: 960px) {
      .container {
        flex-direction: column;
        height: auto;
      }

      .right-panel {
        width: 100%;
        margin-top: 24px;
      }
    }

    .sidebar-buttons {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    .left-btn {
      padding: 8px 16px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    .left-btn:hover {
      background-color: #0d47a1;
    }
`]
})
export class UserComponent implements OnInit {
  customer: any = null;
  selectedSection: 'plans' | 'history' | 'viewProfile' | 'updateProfile' | 'notifications' | null = null;

  intervalId: any;

  constructor(
    private customerService: CustomerService,
    private notificationService: NotificationService,
    public router: Router
  ) { 
  }

  ngOnInit() {
    const storedId = localStorage.getItem("customerId");
    this.customerService.customerId = storedId ? parseInt(storedId) : 0;
    this.selectedSection = "viewProfile";
    this.customerService.getCustomerDetails().subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => console.error('Failed to load customer:', err)
    });
    this.notificationService.checkBalance();
    this.intervalId = setInterval(() => this.notificationService.checkBalance(), 30000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  showSection(section: 'plans' | 'history' | 'viewProfile' | 'updateProfile' | 'notifications') {
    if(this.router.url === '/notifications' && (section == 'updateProfile' || section == 'viewProfile')){
      this.router.navigate(['/view-profile']);
    }
    this.selectedSection = section;
  }
}
