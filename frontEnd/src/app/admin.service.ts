import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './iproduct'; // افترض أن لديك واجهة IProduct
import { IProductResponse } from './iproduct-response';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api/v1/ng/products';

  constructor(private _HttpClient: HttpClient) {}

  // جلب المنتجات من API
  fetchProducts(
    page: number = 1 ,
    limit: number = 10
  ): Observable<IProductResponse> {
    return this._HttpClient.get<IProductResponse>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );
  }

  // إضافة منتج جديد باستخدام FormData
  addProduct(formData: FormData): Observable<IProduct> {
    return this._HttpClient.post<IProduct>(this.apiUrl, formData);
  }

  // تحديث المنتج باستخدام FormData
  updateProduct(formData: FormData, productId: string): Observable<IProduct> {
    return this._HttpClient.patch<IProduct>(
      `${this.apiUrl}/${productId}`,
      formData
    );
  }

  // حذف المنتج
  deleteProduct(id: any): Observable<void> {
    return this._HttpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  // الحصول على منتج بالـ ID (بما أن المنتجات تأتي من API، يمكننا الحصول على المنتج مباشرة من الخادم)
  getProductById(id: string): Observable<IProduct> {
    return this._HttpClient.get<IProduct>(`${this.apiUrl}/${id}`);
  }
}
