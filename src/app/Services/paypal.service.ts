import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayPalService {
  private scriptLoaded = false;
  private Url = "https://localhost:7108/api/Payment"

  constructor(private http: HttpClient) {}

  loadPayPalScript(): Promise<void> {
    if (this.scriptLoaded) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AS_Yc86U1Im1TF3hsfvfj5qUX4fIjEdRuiOwkD0d-99H6b8I29OaHNhR2W_TgsRr15qSxCmF_iVpBzjw';
      script.onload = () => {
        this.scriptLoaded = true;
        console.log(this.scriptLoaded)
        resolve();
      };
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  createPayment(amount: number, currency: string): Observable<any> {
    console.log("create Requested");
    return this.http.post(`${this.Url}/create-payment`, { amount, currency });
  }

  executePayment(paymentId: string, payerId: string): Observable<any> {
    return this.http.post(`${this.Url}/execute-payment`, { paymentId, payerId });
  }
}
