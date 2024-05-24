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
  paymentId:string | null="";
  payerId:string | null="";
  constructor(private payPalService: PayPalService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.loadPayPalScriptAndRenderButton();
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
    const amount = 5; // this.totalPrice
    const currency = 'USD'; 

    (window as any).paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return this.payPalService.createPayment(amount, currency).pipe(
          map((res: any) => {
            const approvalUrl = res.approvalUrl;
            const token = this.getQueryParamValue(approvalUrl, 'token');
            console.log(`Token: ${token}`);
            return token;
          }),
          catchError(error => {
            console.error('Error creating PayPal order:', error);
            return of(null);
          })
        ).toPromise();
      },
      onApprove: (data: any, actions: any) => {
        const paymentId = data.orderID;
        const payerId = data.payerID;
        this.executePaymentSuccessAction(paymentId, payerId);
      },
      onError: (err: any) => {
        console.error('PayPal payment error:', err);
      }
    }).render('#paypal-button-container');
  }

  getQueryParamValue(url: string, param: string): string | null {
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
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
    }).then(() => {
      this.executePayment(paymentId, payerId);
    });
  }

  CashOnPickup(): void {
    let s=false;
    this.payment.emit(s);
  }
}