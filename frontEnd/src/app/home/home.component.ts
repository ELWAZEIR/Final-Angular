// import { Component, OnInit } from '@angular/core';
// import { IProduct } from '../iproduct';
// import { ProductsService } from '../products.service';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// ProductsService

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [FormsModule, RouterLink, CommonModule],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css',
// })
// export class HomeComponent implements OnInit {
//   products: IProduct[] = [];
//   constructor(
//     private _productsService: ProductsService,
//     private _Router: Router
//   ) {
//     //
//   }
//   ngOnInit(): void {
//  this._productsService.getData().subscribe(response => {
//    this.products = response.data;
//    console.log('Products received in home:', response.data);
//  });
//   }


//   addToCart(product: any) {
//     this._productsService.addToCart(product);
//     console.log('Added to cart:', product);
//   }


// }
// import { Component, OnInit } from '@angular/core';
// import { IProduct } from '../iproduct';
// import { ProductsService } from '../products.service';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [FormsModule, RouterLink, CommonModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'], // Corrected to styleUrls (plural)
// })
// export class HomeComponent implements OnInit {
//   products: IProduct[] = [];
//   filteredProducts: IProduct[] = [];
//   brands: string[] = [];
//   categories: string[] = [];
//   selectedBrand: string = '';
//   selectedCategory: string = '';
//   minPrice: number | null = null;
//   maxPrice: number | null = null;

//   constructor(
//     private _productsService: ProductsService,
//     private _router: Router
//   ) {}

//   ngOnInit(): void {
//     this._productsService.getData().subscribe((response) => {
//       this.products = response.data;
//       this.filteredProducts = this.products;
//       console.log('Products received in home:', response.data);

//       // Populate brands and categories for filtering options
//       this.brands = [...new Set(this.products.map((product) => product.brand))];
//       this.categories = [...new Set(this.products.map((product) => product.category))];
//     });
//   }

//   filterProducts() {
//     this.filteredProducts = this.products.filter((product) => {
//       const matchesBrand = this.selectedBrand
//         ? product.brand === this.selectedBrand
//         : true;
//       const matchesCategory = this.selectedCategory
//         ? product.category === this.selectedCategory
//         : true;
//       const matchesPrice =
//         (!this.minPrice || product.price >= this.minPrice) &&
//         (!this.maxPrice || product.price <= this.maxPrice);

//       return matchesBrand && matchesCategory && matchesPrice;
//     });
//   }

//   resetFilters() {
//     this.selectedBrand = '';
//     this.selectedCategory = '';
//     this.minPrice = null;
//     this.maxPrice = null;
//     this.filterProducts(); // Reset to show all products
//   }

//   addToCart(product: IProduct) {
//     this._productsService.addToCart(product);
//     console.log('Added to cart:', product);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../iproduct';
import { ProductsService } from '../products.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Corrected styleUrls to be plural
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  categories: string[] = [];
  brands: string[] = [];
  selectedCategory: string = '';
  selectedBrand: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(
    private _productsService: ProductsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._productsService.getData().subscribe((response) => {
      this.products = response.data;
      this.filteredProducts = this.products;

      // Extract unique categories and brands for filtering options
      this.categories = [...new Set(this.products.map((product) => product.category))];
      this.brands = [...new Set(this.products.map((product) => product.brand))];
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const matchesBrand = this.selectedBrand ? product.brand === this.selectedBrand : true;
      const matchesPrice =
        (!this.minPrice || product.price >= this.minPrice) &&
        (!this.maxPrice || product.price <= this.maxPrice);

      return matchesCategory && matchesBrand && matchesPrice;
    });
  }

  resetFilters() {
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.filterProducts(); // Reset filters and show all products
  }

  addToCart(product: IProduct) {
    this._productsService.addToCart(product);
    console.log('Added to cart:', product);
  }
}
