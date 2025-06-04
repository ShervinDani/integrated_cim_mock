import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
 
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSubject.asObservable();
 
  private hasUnreadSubject = new BehaviorSubject<boolean>(true);
  hasUnread$ = this.hasUnreadSubject.asObservable();
 
  private shownMessages = new Set<string>();
 
  constructor(private http: HttpClient, private router: Router) {
    const storedMessages = localStorage.getItem('notifications');
    if (storedMessages) {
      this.messagesSubject.next(JSON.parse(storedMessages));
    }
  }
 
  checkBalance() {
    const customerId = Number(localStorage.getItem("customerId"));
    this.http.get<{ balance: number }>('http://localhost:1010/users/notifications/'+customerId)
      .subscribe(response => {
        if (response.balance <= 10) {
          const msg = `Your balance is low ${response.balance}`;
          this.addMessage(msg);
        }
      });
  }
 
  addMessage(msg: string) {
    const current = this.messagesSubject.value;
    this.showToast(msg);
    if (!current.includes(msg)) {
      const updated = [...current, msg];
      this.messagesSubject.next(updated);
      if (!this.shownMessages.has(msg)) {
        this.shownMessages.add(msg);
        localStorage.setItem('notifications', JSON.stringify(updated));
        this.showToast(msg);
        this.markAsUnread();
      }
    }
  }
 
  getMessages(): string[] {
    return this.messagesSubject.value;
  }
 
  get messageCount(): number {
    return this.messagesSubject.value.length;
  }
 
  markAsRead() {
    this.hasUnreadSubject.next(false);
  }
 
  markAsUnread() {
    this.hasUnreadSubject.next(true);
  }
 
  showToast(msg: string) {
  if (this.router.url !== '/view-profile') return;

  const toast = document.createElement('div');
  toast.className = 'toast-success';  
  toast.textContent = msg;
  toast.style.position = 'fixed';
  toast.style.top = '80px';
  toast.style.right = '10px';
  toast.style.zIndex = '10000';
  toast.style.opacity = '1';
  toast.style.transition = 'opacity 0.3s ease';

  document.body.appendChild(toast);

  // Fade out and remove
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300); // After fade-out
  }, 3000);
}

}
