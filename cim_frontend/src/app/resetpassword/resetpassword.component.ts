import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-resetpassword',
  imports: [CommonModule, FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit {
  retailerId: number = 0;
  newPassword: string = '';
  confirmPassword: string = '';
   message: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('retailerId');
      if (id) {
        this.retailerId = +id;  // Convert to number
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

    const body = {
      retailerId: this.retailerId,
      newPassword: this.newPassword
    };

    this.http.post('http://localhost:1023/api/users/update-password', body, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          const lowerRes = res.toLowerCase();

          // Check if response indicates retailer not found
          if (lowerRes.includes('not found') || lowerRes.includes('invalid')) {
            // Show error alert instead of success
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res
            });
          } else {
            // Assume success message from backend
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: res
            });
            this.cancel();  // Clear form after success
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
  }
}
