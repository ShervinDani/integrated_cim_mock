import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
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
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Login failed: token not received.');
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        alert('Login failed. Please try again.');
      }
    });
  }
}
