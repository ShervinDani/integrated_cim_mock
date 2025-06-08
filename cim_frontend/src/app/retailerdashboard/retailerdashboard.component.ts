import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './retailerdashboard.component.html',
  styleUrls: ['./retailerdashboard.component.css']
})
export class RetailerDashboardComponent implements OnInit {

  customers: any[] = [];
  registrations: any[] = [];
  plans: any[] = [];

  selectedStatus: string = 'All';
  selectedPlanType: string = 'All';

  statusCounts: { [key: string]: number } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    this.loadCustomers();
    this.loadPlans();
    this.loadRegistrations();
  }

  loadCustomers() {
    this.http.get<any[]>('http://localhost:1010/retailerdashboard/customers')
      .subscribe(data => {
        this.customers = this.selectedStatus === 'All' ? data :
          data.filter(c => c.status?.toLowerCase() === this.selectedStatus.toLowerCase());
      });
  }

  loadPlans() {
    this.http.get<any[]>('http://localhost:1010/retailerdashboard/plans')
      .subscribe(data => {
        this.plans = this.selectedPlanType === 'All' ? data :
          data.filter(p => p.type?.toLowerCase() === this.selectedPlanType.toLowerCase());
      });
  }

  loadRegistrations() {
    this.http.get<any[]>('http://localhost:1010/retailerdashboard/registrationstatus')
      .subscribe(data => {
        const counts: { [key: string]: number } = {};
        data.forEach(entry => {
          const status = entry[0]; 
          const count = entry[1];   
          counts[status] = count;
        });
        this.statusCounts = counts;
      });
  }
}
