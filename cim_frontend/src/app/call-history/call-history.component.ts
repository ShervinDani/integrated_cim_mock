import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-call-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-container">
      <h3>📞 Call History</h3>
      <table *ngIf="callHistory.length > 0; else noData">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Type</th>
            <th>Duration (s)</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let call of callHistory">
            <td>{{ call.timestamp | date:'medium' }}</td>
            <td>{{ call.callType }}</td>
            <td>{{ call.duration }}</td>
          </tr>
        </tbody>
      </table>
      <ng-template #noData>
        <p>No call history found.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .history-container {
      margin: 20px auto;
      padding: 20px;
      max-width: 800px;
      border-radius: 16px;
      background: #fce4ec;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    }
    h3 {
      color: #880e4f;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      text-align: left;
      padding: 8px;
      border-bottom: 1px solid #ccc;
    }
    th {
      background-color: #f8bbd0;
    }
    td {
      color: #4a148c;
    }
  `]
})
export class CallHistoryComponent implements OnInit {
  callHistory: any[] = [];

  constructor(private http: HttpClient, private customerService: CustomerService) {}

  ngOnInit(): void {
    const customerId = this.customerService.getCustomerId();

    this.http.get<any[]>(`http://localhost:1010/call-history/${customerId}`)
      .subscribe({
        next: data => this.callHistory = data,
        error: err => console.error('Failed to fetch call history', err)
      });
  }
}
