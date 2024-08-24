// import { HttpClient  } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, tap, BehaviorSubject } from 'rxjs';
// import { IProduct } from './iproduct';
// import { CartService } from './cartservice.service'; // استيراد CartService



// @Injectable({
//   providedIn: 'root',
// })
// export class ProductsService {
//   constructor(
//     private _HttpClient: HttpClient,
//     private CartService: CartService
//   ) {}
//   //cart componant
//   cart: IProduct[] = [];
//   //addproduct componant
//   private addProduct: IProduct[] = [];
//   private productsSubject = new BehaviorSubject<IProduct[]>([]);
//   products$ = this.productsSubject.asObservable();

//   //api بستلم ال

//   getData(): Observable<any> {
//     return this._HttpClient.get<IProduct[]>(
//       `http://localhost:5000/api/v1/ng/products?page=1&limit=34`
//     );
//   }


//   //دى عشان لما ادوس على المنتج يودينى على
//   getproductDetails(id: number): Observable<any> {
//     return this._HttpClient.get<any>(` http://localhost:5000/api/v1/ng/products/${id}`);
//   }

//   //cart componant ده خاص بعمليات

//    // إضافة منتج للعربة
//     addToCart(product: IProduct) {
//       this.CartService.addToCart({
//         id: product.id,
//         name: product.productName,
//         price: product.price,
//         image: product.photo,
//         quantity: 1,
//       });
//     }



// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from './iproduct';
import { CartService } from './cartservice.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private _HttpClient: HttpClient,
    private CartService: CartService
  ) {}

  private productsSubject = new BehaviorSubject<IProduct[]>([]);
  products$ = this.productsSubject.asObservable();

  // Get products with pagination support
  getData(page: number, limit: number, selectedSort?: number, selectedCategory?: string): Observable<any> {
    return this._HttpClient.get<IProduct[]>(
      `http://localhost:5000/api/v1/ng/products?page=1&limit=10`
      // `http://localhost:5000/api/v1/ng/products?page=4&limit=6`
    );

  }

  // Get product details by ID
  getproductDetails(id: number): Observable<any> {
    return this._HttpClient.get<any>(`http://localhost:5000/api/v1/ng/products/${id}`);
  }
// Add this method to your ProductsService
searchProducts(query: string) {
  return this._HttpClient.get<IProduct[]>(
    `http://localhost:5000/api/v1/ng/products?search=${query}`
  );
}


  // Add product to cart
  addToCart(product: IProduct) {
    this.CartService.addToCart({
      id: product.id,
      name: product.productName,
      price: product.price,
      image: product.photo,
      quantity: 1,
    });
  }
}
