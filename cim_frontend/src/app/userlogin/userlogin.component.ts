import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'] // ✅ use 'styleUrls' instead of 'styleUrl'
})
export class UserloginComponent {
  email: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  async sendOtp(): Promise<void> {
    if (!this.email) {
      alert('Please enter your email');
      return;
    }

    try {
      const response = await firstValueFrom(
        this.http.post<{ message: string }>('http://localhost:1426/send-otp', { email: this.email })
      );

      console.log(response.message); // Optional: log backend message
      localStorage.setItem('email', this.email);
      this.router.navigate(['/verify-otp']);
    } catch (error: any) {
      console.error('Error from backend:', error);
      alert(error?.error?.message || 'Failed to send OTP');
    }
  }
}
