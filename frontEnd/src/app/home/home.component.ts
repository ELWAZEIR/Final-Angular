import { Component, OnInit } from '@angular/core';
import { IProduct } from '../iproduct';
import { ProductsService } from '../products.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
ProductsService

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  constructor(
    private _productsService: ProductsService,
    private _Router: Router
  ) {
    //
  }
  ngOnInit(): void {
 this._productsService.getData().subscribe(response => {
   this.products = response.data;
   console.log('Products received in home:', response.data);
 });
  }


   

    
  

  addToCart(product: any) {
    this._productsService.addToCart(product);
    console.log('Added to cart:', product);
  }

  
}
