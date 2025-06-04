import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-admin-notifications',
  standalone: true,               // standalone component
  imports: [CommonModule, FormsModule],  // import what we need
  templateUrl: './admin-notifications.component.html',
  styleUrls: ['./admin-notifications.component.css']
})
export class AdminNotificationsComponent {
  doNotDisturb = false;

 notifications: Notification[] = [
  { id: 1, message: 'Jio plan renewed successfully. Enjoy unlimited data!', time: 'Just now', read: false },
  { id: 2, message: 'New JioFiber connection installation scheduled for tomorrow', time: '30 mins ago', read: false },
  { id: 3, message: 'Your JioPay bill of ₹499 is due on 10th June', time: '1h ago', read: false },
  { id: 4, message: 'App update available: JioSwitch version 2.5.1', time: '2h ago', read: true },
  { id: 5, message: 'JioCinema new movies added this week, check them out!', time: 'Yesterday', read: false },
  { id: 6, message: 'Your data usage crossed 75% for this billing cycle', time: '2 days ago', read: true },
  { id: 7, message: 'Special offer: Get 50% cashback on recharging via JioMoney', time: '4 days ago', read: false }
];


  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }
  markAllAsUnread() {
  this.notifications.forEach(n => n.read = false);
}
}
