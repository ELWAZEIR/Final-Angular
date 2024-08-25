import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../iproduct';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css'], // يجب أن تكون styleUrls
})
export class DetailsProductComponent implements OnInit {
  id!: string; // يمكنك استخدام string هنا بدلاً من any
  productDetails: any; // يمكنك استخدام نوع أكثر تحديدًا بدلاً من any

  constructor(
    private _productsService: ProductsService,
    private activatedRoute: ActivatedRoute, // تعديل التسمية إلى snake_case
    private productsService: ProductsService // تعديل التسمية إلى camelCase
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || ''; // إضافة قيمة افتراضية
    console.log(this.id);

    this.productsService.getproductDetails(this.id).subscribe((product) => {
      this.productDetails = product.data.product;
      console.log(this.productDetails.data.product); // يجب أن يكون هنا بعد الحصول على البيانات
    });
  }
  addToCart(product: IProduct) {
    this._productsService.addToCart(product);
  }
}
