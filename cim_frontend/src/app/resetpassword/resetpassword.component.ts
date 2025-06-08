import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit {
  retailerId: number = 0;
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
 
  passwordStrengthMessage: string = '';
  passwordStrengthClass: string = '';
  passwordMatchMessage: string = '';
  passwordMatchClass: string = '';
 
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('retailerId');
      if (id) {
        this.retailerId = +id;
      }
    });
  }
 
  submitForm() {
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!'
      });
      return;
    }
 
    if (!this.isStrongPassword(this.newPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password!',
        text: 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.'
      });
      return;
    }
 
    const body = {
      retailerId: this.retailerId,
      newPassword: this.newPassword
    };
 
    this.http.post('http://localhost:1023/api/users/update-password', body, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          const lowerRes = res.toLowerCase();
          if (lowerRes.includes('not found') || lowerRes.includes('invalid')) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: res
            });
            this.cancel();
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error || 'Something went wrong!'
          });
        }
      });
  }
 
  cancel() {
    this.retailerId = 0;
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordStrengthMessage = '';
    this.passwordStrengthClass = '';
    this.passwordMatchMessage = '';
    this.passwordMatchClass = '';
  }
 
  checkPasswordStrength() {
    const password = this.newPassword;
 
    if (password.length < 8) {
      this.passwordStrengthMessage = 'Too short';
      this.passwordStrengthClass = 'weak';
    } else if (!/[A-Z]/.test(password)) {
      this.passwordStrengthMessage = 'Missing uppercase letter';
      this.passwordStrengthClass = 'weak';
    } else if (!/[a-z]/.test(password)) {
      this.passwordStrengthMessage = 'Missing lowercase letter';
      this.passwordStrengthClass = 'weak';
    } else if (!/\d/.test(password)) {
      this.passwordStrengthMessage = 'Missing number';
      this.passwordStrengthClass = 'weak';
    } else if (!/[\W_]/.test(password)) {
      this.passwordStrengthMessage = 'Missing special character';
      this.passwordStrengthClass = 'weak';
    } else {
      this.passwordStrengthMessage = 'Strong password';
      this.passwordStrengthClass = 'strong';
    }
  }
 
  checkPasswordsMatch() {
    if (this.newPassword && this.confirmPassword) {
      if (this.newPassword === this.confirmPassword) {
        this.passwordMatchMessage = 'Passwords match!';
        this.passwordMatchClass = 'match';
      } else {
        this.passwordMatchMessage = 'Passwords do not match!';
        this.passwordMatchClass = 'no-match';
      }
    } else {
      this.passwordMatchMessage = '';
      this.passwordMatchClass = '';
    }
  }
 
  isStrongPassword(password: string): boolean {
    const strongPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongPattern.test(password);
  }
}
 