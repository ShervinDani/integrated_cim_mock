import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  template: `<h2>Payment Gateway for Plan ID: {{ planId }}</h2>`,
})
export class PaymentGatewayComponent {
  planId: string;

  constructor(private route: ActivatedRoute) {
    this.planId = this.route.snapshot.paramMap.get('planId')!;
  }
}
