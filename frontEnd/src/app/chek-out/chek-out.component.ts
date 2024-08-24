import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../iproduct';

@Component({
  selector: 'app-chek-out',
  templateUrl: './chek-out.component.html',
  styleUrls: ['./chek-out.component.css']
})
export class CheckoutComponent implements OnInit {

  products: IProduct[] = [];
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.initializePayPalButton();
  }

  // دالة لإدارة عملية التأكيد
  confirmOrder() {
    console.log('Order confirmed');
    this.router.navigate(['/order-confirmation']);
  }

  // دالة لإدارة عملية الإلغاء
  cancelOrder() {
    console.log('Order cancelled');
    this.router.navigate(['/home']);
  }

  // دالة لتهيئة زر PayPal
  initializePayPalButton() {
    // تحقق من تحميل المكتبة قبل تنفيذ هذا الكود
    if ((window as any).paypal) {
      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '30.00' // هنا يمكنك تحديد المبلغ الصحيح للطلب
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then(() => {
            console.log('Payment successful');
            this.confirmOrder(); // تأكيد الطلب بعد الدفع
          });
        },
        onError: (err: any) => {
          console.error('Payment failed', err);
        }
      }).render('#paypal-button-container');
    }
  }

  // دالة لدفع عبر PayPal
  payWithPayPal() {
    // قد تحتاج لتفعيل زر PayPal هنا إذا كان غير مفعل تلقائيًا
    console.log('Initiating PayPal payment');
  }
}
