import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-session-logs',
  imports: [CommonModule],
  templateUrl: './session-logs.component.html',
  styleUrl: './session-logs.component.css'
})
export class SessionLogsComponent {
  userSessions: any[] = [];
  retailerSessions: any[] = [];

  ngOnInit(): void {
    this.loadStaticData();
  }

  loadStaticData(): void {
    this.userSessions = [
      {
        sessionId: 'US123',
        username: 'alice',
        ipAddress: '192.168.1.1',
        loginTime: '2025-06-03 09:00 AM',
        logoutTime: '2025-06-03 10:30 AM',
        status: 'Inactive'
      },
      {
        sessionId: 'US124',
        username: 'bob',
        ipAddress: '192.168.1.2',
        loginTime: '2025-06-03 09:15 AM',
        logoutTime: '',
        status: 'Active'
      },
      {
        sessionId: 'US125',
        username: 'charlie',
        ipAddress: '192.168.1.3',
        loginTime: '2025-06-03 09:45 AM',
        logoutTime: '2025-06-03 10:00 AM',
        status: 'Terminated'
      }
    ];

    this.retailerSessions = [
      {
        sessionId: 'RT201',
        username: 'retailer_one',
        ipAddress: '10.0.0.1',
        loginTime: '2025-06-03 08:30 AM',
        logoutTime: '2025-06-03 09:30 AM',
        status: 'Inactive'
      },
      {
        sessionId: 'RT202',
        username: 'retailer_two',
        ipAddress: '10.0.0.2',
        loginTime: '2025-06-03 09:00 AM',
        logoutTime: '',
        status: 'Active'
      }
    ];
  }

  terminateSession(session: any, isUser: boolean): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to terminate this session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, terminate it!'
    }).then((result) => {
      if (result.isConfirmed) {
        session.status = 'Terminated';
        Swal.fire(
          'Terminated!',
          'The session has been terminated.',
          'success'
        );
      }
    });
  }
}


