// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductsService } from '../products.service';
// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css'],
//   standalone: true
// })
// export class ProductsComponent implements OnInit {
//   category!: string;
//   products: any[] = []; // Define your product type here

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductsService
//   ) {}

//   ngOnInit(): void {
//     this.category = this.route.snapshot.paramMap.get('category')!;
//     this.loadProductsByCategory(this.category);
//   }

//   loadProductsByCategory(category: string): void {
//     this.productService.getProductsByCategory(category).subscribe(
//       (data: any[]) => {
//         this.products = data;
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }
// }
