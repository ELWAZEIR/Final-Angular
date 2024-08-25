import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { MinusIconComponent } from '../minus-icon/minus-icon.component';
import { PlusIconComponent } from '../plus-icon/plus-icon.component';
import { TrashIconComponent } from '../trash-icon/trash-icon.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cartservice.service'; // استيراد CartService
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
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
  constructor(public cartService: CartService,private router: Router) {} // حقن CartService


  navigateToCheckout() {
    this.router.navigate(['/checkout']); 
  }
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
    Toastify({
      text: "Are you sure you want to remove this item?",
      duration: 5000,
      destination: "#",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: () => {
        // Handle the user's response
        if (confirm("Do you really want to remove this item?")) {
          this.cartService.removeFromCart(id);
        }
      }
    }).showToast();
  }
}


