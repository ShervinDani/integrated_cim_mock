import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule here

  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  otp: string = '';
  email: string = localStorage.getItem('email') || '';

  constructor(private http: HttpClient, private router: Router) { }



  async verifyOtp() {
    try {
      await firstValueFrom(this.http.post('http://localhost:1426/verify-otp', {
        email: this.email,
        otp: this.otp
      }));
      alert('OTP Verified');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      alert('Invalid OTP');
      console.error('OTP verification failed:', error);
    }
  }

}
