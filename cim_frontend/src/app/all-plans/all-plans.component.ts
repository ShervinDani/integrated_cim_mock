import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.css']
})
export class AllPlansComponent implements OnInit {
  plans: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:1010/getallplans').subscribe(data => {
      this.plans = data;
    });
  }

  recharge(planId: number): void {
    this.router.navigate(['/recharge', planId]);
  }
}
