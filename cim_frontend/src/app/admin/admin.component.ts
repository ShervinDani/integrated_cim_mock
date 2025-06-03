import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
title = 'admin';
  isSidebarOpen = false;
  activeSection: string = 'users';  // Default active section

  constructor(private router: Router
  ) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  viewUsers() {
    this.activeSection = 'users';
    this.router.navigate(['/admin/home']);
  }

  viewRetailers() {
    this.activeSection = 'retailers';
    this.router.navigate(['/admin/home/retailer']);
  }

  Document() {
    this.activeSection = 'document';
    this.router.navigate(['admin/home/document']);
  }

  SessionLogs() {
    this.activeSection = 'sessionLogs';
    this.router.navigate(['admin/home/session-logs']);
  }

  ViewPlans() {
    this.activeSection = 'plans';
    this.router.navigate(['admin/home/plans']);
  }

  ResetPassword() {
    this.activeSection = 'resetPassword';
    this.router.navigate(['admin/home/resetpassword']);
  }

  logout() {
    this.router.navigate(['admin/home/login']);
  }
   dashboard() {
    this.activeSection='dashboard';
    this.router.navigate(['admin/home/dashboard']);
  }
  userManagement()
  {
    this.activeSection='usermanagement';
    this.router.navigate(['admin/home/usermanagement']);
  }
viewNotifications() {
  this.activeSection = 'notifications';
  this.router.navigate(['/admin/home/notifications']);
}
}