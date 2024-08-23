/* import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor() { }
} */
interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
import { Injectable, signal } from '@angular/core';
// import { CartItem } from './cart-item.model'; // تأكد من وجود هذا النموذج

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productCart = signal<CartItem[]>([]);

  // دالة لتغيير الكمية
  handleQuantityChange(id: number, quantity: number) {
    const updatedItems = this.productCart().map((item) =>
      item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
    );
    this.productCart.set(updatedItems); // تحديث العربة بالإعدادات الجديدة
  }

  addToCart(product: CartItem) {
    const existingProduct = this.productCart().find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      this.handleQuantityChange(product.id, existingProduct.quantity + 1);
    } else {
      this.productCart.set([
        ...this.productCart(),
        { ...product, quantity: 1 },
      ]);
    }
  }

  removeFromCart(productId: number) {
    const updatedItems = this.productCart().filter(
      (item) => item.id !== productId
    );
    this.productCart.set(updatedItems);
  }

  get subtotal() {
    return this.productCart().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  get tax() {
    return this.subtotal * 0.1;
  }

  get total() {
    return this.subtotal + this.tax;
  }
}

