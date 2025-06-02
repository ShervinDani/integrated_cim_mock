import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { NotificationService } from '../notification.service';
 
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService, private router: Router) {}
 
  toggleNotificationPage() {
    console.log("working");
    if (this.router.url === '/notifications') {
      this.router.navigate(['/view-profile']);
    } else {
      this.notificationService.markAsRead();
      this.router.navigate(['/notifications']);
    }
  }
}