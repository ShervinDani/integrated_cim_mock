
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-payment',
//   imports: [],
//   templateUrl: './payment.component.html',
//   styleUrl: './payment.component.css'
// })
// export class PaymentComponent implements OnInit {
//   plan : any;
//   isNUmberNeed : boolean = true;
//   ngOnInit(): void {
//     const data = sessionStorage.getItem("plan");
//     const customer = JSON.parse(sessionStorage.getItem("userDetails") || '{}')
//     if(Object.keys(customer).length == 0)
//     {
//       this.isNUmberNeed = false;
//     }
//     if(data != null)
//     {
//       this.plan = JSON.parse(data);
//     }

//   }


// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  plan: any;
  customer: any = {};
  isCustomerAvailable: boolean = true;
  paymentSuccess: boolean = false;
  loading: boolean = false;
  phoneNumber: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const planData = sessionStorage.getItem("plan");
    const customerData = sessionStorage.getItem("userDetails");

    if (planData) {
      this.plan = JSON.parse(planData);
    }

    if (customerData) {
      this.customer = JSON.parse(customerData);
      this.isCustomerAvailable = true;
    } else {
      this.isCustomerAvailable = false;
    }
  }

  payAndSubmit(): void {
    const customerData = sessionStorage.getItem("userDetails");
    if (customerData) {
      this.customer = JSON.parse(customerData);
      this.isCustomerAvailable = true;
    } else {
      this.isCustomerAvailable = false;
    }
    if (!this.plan || !this.customer?.customerId) {

      alert('Missing plan or customer information.');
      return;
    }

    const payload = {
      customerId: this.customer.customerId,
      planId: this.plan.id,
      amount: this.plan.price
    };

    this.loading = true;

    this.http.post('http://localhost:1010/submit', payload).subscribe({
      next: (res) => {
        console.log('Payment submitted:', res);
        this.paymentSuccess = true;
        this.loading = false;
      },
      error: (err) => {
        console.error('Payment failed:', err);
        alert('Payment failed. Please try again.');
        this.loading = false;
      }
    });
  }

  getDetails() {
  this.http.get('http://localhost:1010/getCustomerDetailsByPhoneNumber', {
    params: { phoneNumber: String(this.phoneNumber) }
  }).subscribe({
    next: (res) => {
      console.log('Customer details:', res);
      sessionStorage.setItem("userDetails",JSON.stringify(res));
      alert("You can pay now");
    },
    error: (err) => {
      console.error('Fetch failed:', err);
      alert('Failed to fetch customer details. Please try again.');
    }
  });
}



}
