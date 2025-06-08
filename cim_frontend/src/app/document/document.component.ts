import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

interface Document {
  id: string;
  submittedBy: string;
  fileUrl: string;
  status: string;
}
@Component({
  selector: 'app-document',
  imports: [CommonModule],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent implements OnInit {
  documents: Document[] = [];

  ngOnInit(): void {
    this.documents = [
      { id: 'DOC001', submittedBy: 'John Doe', fileUrl: '#', status: 'Pending' },
      { id: 'DOC002', submittedBy: 'Jane Smith', fileUrl: '#', status: 'Pending' },
      { id: 'DOC003', submittedBy: 'Alice Johnson', fileUrl: '#', status: 'Verified' },
      { id: 'DOC004', submittedBy: 'Bob Williams', fileUrl: '#', status: 'Pending' }
    ];
  }

  acceptDocument(doc: Document): void {
    Swal.fire({
      title: 'Verify Document',
      text: `Are you sure you want to verify document ${doc.id}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Verify',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        doc.status = 'Verified';
        Swal.fire('Verified!', `Document ${doc.id} has been verified.`, 'success');
      }
    });
  }

  rejectDocument(doc: Document): void {
    Swal.fire({
      title: 'Set as Pending',
      text: `Are you sure you want to set document ${doc.id} as pending?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Set Pending',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        doc.status = 'Pending';
        Swal.fire('Pending!', `Document ${doc.id} has been set as pending.`, 'info');
      }
    });
  }
}

