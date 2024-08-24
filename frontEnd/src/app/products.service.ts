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
  // Get products with pagination support
getData(page: number, limit: number): Observable<any> {
  return this._HttpClient.get<any>(`http://localhost:5000/api/v1/ng/products?page=${page}&limit=${limit}`);
}

  // Get product details by ID
  getproductDetails(id: any): Observable<any> {
    return this._HttpClient.get<any>(`http://localhost:5000/api/v1/ng/products/${id}`);
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
