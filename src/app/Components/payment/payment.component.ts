import { Component, EventEmitter, OnInit, Output, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { PayPalService } from '../../Services/paypal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  @Input() rentalPriceDay: number | any;
  @Input() totalPrice: number | any;
  @Output() payment:EventEmitter<any> = new EventEmitter();
  constructor(private payPalService: PayPalService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log(this.rentalPriceDay+"--> from payment")
    console.log(this.totalPrice+"--> from payment")
    this.route.queryParams.subscribe(params => {
      const paymentId = params['paymentId'];
      const payerId = params['PayerID'];

      if (paymentId && payerId) {
        this.executePayment(paymentId, payerId);
      } else {
        this.loadPayPalScriptAndRenderButton();
      }
    });
  }

  loadPayPalScriptAndRenderButton(): void {
    this.payPalService.loadPayPalScript().then(() => {
      this.renderPayPalButton();
    }).catch(error => {
      console.error('PayPal SDK could not be loaded.', error);
    });
  }

  renderPayPalButton(): void {
    const amount = 10.00; 
    const currency = 'USD'; 

    (window as any).paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return this.payPalService.createPayment(amount, currency).pipe(
          map((response: any) => response.id),
          catchError(error => {
            console.error('Error creating PayPal order:', error);
            return of(null);
          })
        );
      },
      onApprove: (data: any, actions: any) => {
        this.executePaymentSuccessAction(data.orderID, data.payerID);
      },
      onError: (err: any) => {
        console.error('PayPal payment error:', err);
      }
    }).render('#paypal-button-container');
  }

  executePayment(paymentId: string, payerId: string): void {
    this.payPalService.executePayment(paymentId, payerId).subscribe((payment: any) => {
      console.log('Payment successful!', payment);
      alert('Payment successful!');
      this.router.navigate([]); 
    }, error => {
      console.error('Payment execution error:', error);
    });
  }

  executePaymentSuccessAction(paymentId: string, payerId: string): void {
    this.router.navigate([], { 
      queryParams: {
        paymentId: paymentId,
        PayerID: payerId
      }
    });
  }

  CashOnPickup(): void {
    let s=false;
    this.payment.emit(s);
  }
}