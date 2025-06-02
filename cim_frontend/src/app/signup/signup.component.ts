import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupObj: any = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onSignup() {
    localStorage.removeItem('authToken');
    this.http.post('http://localhost:1010/register', this.signupObj).subscribe({
      next: (res: any) => {
        alert('Registration successful!');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}

