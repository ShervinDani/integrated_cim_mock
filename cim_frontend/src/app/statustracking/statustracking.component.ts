import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-statustracking',
  templateUrl: './statustracking.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault],
  styleUrls: ['./statustracking.component.css']
})
export class StatustrackingComponent {
  phoneNumber = '';
  statusMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  checkStatus() {
    if (!this.phoneNumber || this.phoneNumber.trim().length < 10) {
      this.statusMessage = '';
      this.errorMessage = 'Please enter a valid phone number.';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.statusMessage = '';
    this.errorMessage = '';

    this.http.get('http://localhost:1010/trackStatus', {
      params: { phoneNumber: this.phoneNumber },
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        this.statusMessage = response.trim();
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: () => {
        this.statusMessage = '';
        this.errorMessage = 'Error fetching status. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
