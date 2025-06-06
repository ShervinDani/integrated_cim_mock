import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  otp: string = '';
  email: string = localStorage.getItem('email') || '';

  constructor(private http: HttpClient, private router: Router) { }

async verifyOtp() {
  localStorage.removeItem('authToken');
  try {
    // First: verify the OTP and expect a token in response
    const otpResponse: any = await firstValueFrom(
      this.http.post('http://localhost:1010/verify-otp', {
        email: this.email,
        otp: this.otp
      })
    );

    console.log('OTP verification response:', otpResponse);

    // Store token in localStorage if it exists
    if (otpResponse?.token) {
      localStorage.setItem('authToken', otpResponse.token);
      alert('OTP Verified');
    } else {
      alert('OTP verification failed: token not received');
      return;
    }

      this.http.get<any>(`http://localhost:1010/getCustomerByEmail/${this.email}`).subscribe({
  next: (customer) => {
    console.log("Hello " + customer);
    if (customer>0) {
      localStorage.setItem("customerId", customer);
      this.router.navigate(['/user/dashboard']);
    } else {
      console.error('Customer data did not contain an id');
    }
  },
  error: (err) => {
    console.error('Failed to fetch customer data:', err);
  }
});

    } catch (error) {
      alert('Invalid OTP or customer fetch failed');
      console.error('OTP verification or customer fetch failed:', error);
    }
  }
}
