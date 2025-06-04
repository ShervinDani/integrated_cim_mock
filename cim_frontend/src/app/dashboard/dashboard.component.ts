import { Component,AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
 
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 
   ngAfterViewInit(): void {
    this.renderBarChart();
    this.renderPieChart();
  }
 
  renderBarChart(): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Plan Orders',
          data: [120, 185, 290, 245, 390, 340],
          backgroundColor: '#4a90e2',
          borderRadius: 6,
          maxBarThickness: 50
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
 
  renderPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Admin', 'Retailer', 'User'],
        datasets: [{
          label: 'User Roles',
          data: [10, 25, 65],
          backgroundColor: ['#4a90e2', '#f39c12', '#27ae60'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
}