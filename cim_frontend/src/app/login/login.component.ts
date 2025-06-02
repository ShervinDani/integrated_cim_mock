import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onLogin() {
    localStorage.removeItem('authToken');
    this.http.post('http://localhost:1010/login', this.loginObj).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res?.token) {
          localStorage.setItem('authToken', res.token);
          this.router.navigateByUrl('retailer/home');
        } else {
          alert('Login failed: token not received.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login failed. Please try again.');
      }
    });
  }
}

