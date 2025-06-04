import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  selectedPeriod: string = '';
  reportData: { username: string; activity: string; timestamp: string }[] = [];

  generateReport() {
    this.reportData = [
      { username: 'Sidikkaa', activity: 'Logged in', timestamp: '2025-05-27 08:00' },
      { username: 'Sidikkaa', activity: 'Updated profile', timestamp: '2025-05-27 09:30' },
      { username: 'priya', activity: 'Logged out', timestamp: '2025-05-27 10:15' },
      { username: 'yasmin', activity: 'Changed password', timestamp: '2025-05-27 10:45' },
      { username: 'sidikkaa', activity: 'Logged in', timestamp: '2025-05-27 11:00' },
      { username: 'jysohna', activity: 'Viewed dashboard', timestamp: '2025-05-27 11:30' },
      { username: 'viji', activity: 'Uploaded document', timestamp: '2025-05-27 12:00' },
      { username: 'mayil', activity: 'Deleted account', timestamp: '2025-05-27 12:45' },
      { username: 'nisha', activity: 'Updated profile', timestamp: '2025-05-27 13:15' },
      { username: 'jaav', activity: 'Logged in', timestamp: '2025-05-27 14:00' }
    ];
  }

  downloadReport() {
    if (this.reportData.length === 0) return;

    const header = 'Username,Activity,Timestamp\n';
    const csv = this.reportData.map(row =>
      `${row.username},${row.activity},${row.timestamp}`
    ).join('\n');

    const csvContent = header + csv;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${this.selectedPeriod}-user-activity-report.csv`;
    anchor.click();

    window.URL.revokeObjectURL(url);
  }
}


 