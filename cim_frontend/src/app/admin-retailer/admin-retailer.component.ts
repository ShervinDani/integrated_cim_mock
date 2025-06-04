import { Component, OnInit } from '@angular/core';
import { MethodService } from '../service/method.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-retailer',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-retailer.component.html',
  styleUrl: './admin-retailer.component.css'
})
export class AdminRetailerComponent implements OnInit {
  datas: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';

  constructor(private method: MethodService, private router: Router) {}

  ngOnInit(): void {
    this.method.getRetailer().subscribe({
      next: (res) => {
        this.datas = res;
        this.filteredData = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  
  editPassword(retailerId: number) {
    console.log('Edit password clicked for retailer:', retailerId);
    this.router.navigate(['/admin/home/resetpassword', retailerId]);
  }

  filterByName() {
    const term = this.searchText.toLowerCase();
    this.filteredData = this.datas.filter(item =>
      item.ownerName?.toLowerCase().includes(term)
    );
  }

}