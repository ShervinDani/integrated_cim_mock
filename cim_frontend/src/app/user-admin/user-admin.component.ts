import { Component, OnInit } from '@angular/core';
import { MethodService } from '../service/method.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent implements OnInit {
  data: any[] = [];           // Full list of users
  filteredData: any[] = [];   // Filtered list based on search
  searchTerm: string = '';    // Search input model

  constructor(private method: MethodService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.method.getAllUsers().subscribe({
      next: (res) => {
        console.log('User data:', res);
        this.data = Array.isArray(res) ? res : res.users || [];
        this.filteredData = this.data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
onToggleStatus(user: any, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  user.status = checked ? 'Active' : 'Inactive';
  console.log(user.status)
  this.onStatusChange(user);  // call your existing handler to do further processing, if any
}

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (term === '') {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter(user =>
        (user.firstName?.toLowerCase().includes(term) || 
         user.lastName?.toLowerCase().includes(term))
      );
    }
  }

  onStatusChange(customer: any): void {
    console.log(customer)
    const newStatus = customer.active;
    this.method.updateCustomerStatus(customer.customerId, newStatus).subscribe({
      next: (res) => {
        console.log(res , " Result")
        customer.active = !customer.active
        Swal.fire({
          title: 'Success!',
          text: `Status updated to ${!newStatus} successfully!`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error updating status:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update status.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
