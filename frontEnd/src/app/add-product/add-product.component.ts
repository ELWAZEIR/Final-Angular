import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../iproduct';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup; // تعريف نموذج المنتج
  photo: string | ArrayBuffer | null = null;
  isUpdateMode = false; // لتحديد إذا كان في وضع التحديث أو الإضافة
  productId: string | null = null; // تعريف المتغير لتخزين الـ id الخاص بالمنتج
  products: IProduct[] = []; // مصفوفة لتخزين المنتجات
  categories = [
    'Supermarket',
    'Fashion',
    'Health & Beauty',
    'Baby Products',
    'Phones & Tablets',
    'Home & Furniture',
    'Appliances',
    'Televisions & Audio',
    'Computing',
    'Sporting Goods',
    'Gaming',
    'Other categories',
  ];

  constructor(
    private fb: FormBuilder, // استخدام FormBuilder لبناء النموذج
    private adminService: AdminService, // استخدام الخدمة لعمليات CRUD
    private route: ActivatedRoute, // للحصول على معلومات المسار الحالي
    private router: Router // للتنقل بين الصفحات
  ) {
    // إنشاء نموذج المنتج مع الحقول المختلفة
    this.productForm = this.fb.group({
      productName: new FormControl('', [Validators.required]), // حقل اسم المنتج
      price: new FormControl('', [Validators.required]), // حقل السعر
      category: new FormControl('', [Validators.required]), // حقل الفئة
      photo: new FormControl(null, [Validators.required]), // حقل الصورة
      description: new FormControl('', [Validators.required]), // حقل الوصف
      brand: new FormControl('', [Validators.required]), // إضافة حقل العلامة التجارية الجديد
    });
  }

  ngOnInit(): void {
    this.loadProducts(); // جلب المنتجات عند التحميل

    // التحقق مما إذا كان هذا تحديث لمنتج موجود
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isUpdateMode = true; // تعيين وضع التحديث
        this.productId = id; // تعيين ID المنتج
        this.adminService
          .getProductById(this.productId)
          .subscribe((product) => {
            if (product) {
              this.productForm.patchValue(product); // تعبئة النموذج بقيم المنتج
            }
          });
      }
    });
  }

  // للتعامل مع تحديد الملف
  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    console.log('file', file);
    if (file) {
      this.productForm.get('photo')?.setValue(file); // تخزين الملف في النموذج
    }
  }

  // تحميل المنتجات من API
  loadProducts(): void {
    this.adminService.fetchProducts().subscribe((response) => {
      this.products = response.data;
      console.log(response.data);
    });
  }

  // التعامل مع إرسال النموذج
  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append(
        'productName',
        this.productForm.get('productName')?.value
      );
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );
      formData.append('brand', this.productForm.get('brand')?.value); // إضافة العلامة التجارية إلى البيانات

      const fileControl = this.productForm.get('photo')?.value;
      if (fileControl && fileControl instanceof File) {
        formData.append('photo', fileControl);
      }

      const productId = this.productId ? this.productId : Date.now().toString();

      if (this.isUpdateMode) {
        // تحديث المنتج
        this.adminService.updateProduct(formData, productId).subscribe(() => {
          this.loadProducts(); // إعادة تحميل المنتجات بعد التحديث
          this.router.navigate(['/home']);
        });
      } else {
        // إضافة منتج جديد
        this.adminService.addProduct(formData).subscribe(() => {
          this.loadProducts(); // إعادة تحميل المنتجات بعد الإضافة
          this.router.navigate(['/home']);
        });
      }
    }
  }

  // حذف المنتج
  deleteProduct(id: object): void {
    this.adminService.deleteProduct(id).subscribe(() => {
      console.log(id);
      this.loadProducts(); // إعادة تحميل المنتجات بعد الحذف
    });
  }

  // ملء النموذج لتحديث المنتج
  editProduct(product: IProduct): void {
    this.isUpdateMode = true;
    this.productId = product.id.toString();
    this.productForm.patchValue(product);
  }
}

