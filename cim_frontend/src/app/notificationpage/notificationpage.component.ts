import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="">
      <h2>Notifications</h2>
    <ul>
      <li *ngFor="let msg of messages">{{ msg }}</li>
    </ul>
    </div>
  `,
  styleUrls: ['./notificationpage.component.css']
})
export class NotificationPageComponent implements OnInit {
  messages: string[] = [];

  constructor(private notificationService: NotificationService, private router: Router) {
  }

  ngOnInit(): void {
    console.log("working2")
    this.messages = this.notificationService.getMessages();
  }
}