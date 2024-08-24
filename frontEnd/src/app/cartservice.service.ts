
import { Injectable, signal } from '@angular/core';

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productCart = signal<CartItem[]>(this.loadCartFromLocalStorage());

  // Helper function to check if the code is running in the browser
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Update localStorage only in the browser
  updateLocalStorage() {
    if (this.isBrowser()) {
      localStorage.setItem('cart', JSON.stringify(this.productCart()));
    }
  }

  // Load cart data from localStorage only if in the browser
  loadCartFromLocalStorage(): CartItem[] {
    if (this.isBrowser()) {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return []; // Return empty array if not in browser
  }

  handleQuantityChange(id: number, quantity: number) {
    const updatedItems = this.productCart().map((item) =>
      item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
    );
    this.productCart.set(updatedItems);
    this.updateLocalStorage(); // Sync with localStorage after quantity change
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
      this.updateLocalStorage(); // Sync with localStorage after adding item
    }
  }

  removeFromCart(productId: number) {
    const updatedItems = this.productCart().filter(
      (item) => item.id !== productId
    );
    this.productCart.set(updatedItems);
    this.updateLocalStorage(); // Sync with localStorage after removing item
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
