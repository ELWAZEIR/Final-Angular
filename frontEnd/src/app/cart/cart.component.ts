import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { MinusIconComponent } from '../minus-icon/minus-icon.component';
import { PlusIconComponent } from '../plus-icon/plus-icon.component';
import { TrashIconComponent } from '../trash-icon/trash-icon.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cartservice.service'; // استيراد CartService
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgFor,
    NgIf,
    MinusIconComponent,
    PlusIconComponent,
    TrashIconComponent,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(public cartService: CartService) {} // حقن CartService

  // استخدام الخصائص من CartService
  get subtotal() {
    return this.cartService.subtotal;
  }

  get tax() {
    return this.cartService.tax;
  }

  get total() {
    return this.cartService.total;
  }

  handleQuantityChange(id: number, quantity: number) {
    const cartItem = this.cartService
      .productCart()
      .find((item) => item.id === id);
    if (cartItem) {
      this.cartService.handleQuantityChange(id, quantity);
    }
  }

  handleRemoveItem(id: number) {
    this.cartService.removeFromCart(id);
  }
}


