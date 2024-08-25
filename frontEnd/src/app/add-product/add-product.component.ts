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
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  photo: string | ArrayBuffer | null = null;
  isUpdateMode = false;
  productId: string | null = null;
  products: IProduct[] = [];
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
  errorMessages: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      productName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      photo: new FormControl(null, [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      brand: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
    });
  }


  

  ngOnInit(): void {
    this.loadProducts();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isUpdateMode = true;
        this.productId = id;
        this.adminService
          .getProductById(this.productId)
          .subscribe((product) => {
            if (product) {
              this.productForm.patchValue(product);
            }
          });
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.productForm.get('photo')?.setValue(file);
    }
  }

  loadProducts(): void {
    this.adminService.fetchProducts().subscribe((response) => {
      this.products = response.data;
    });
  }

  onSubmit(): void {
    const formValue = this.productForm.value;
      console.log(this.productForm);

    if(this.productForm.invalid){
      this.productForm.markAllAsTouched()
      console.log('dirty')
    }

     const formData = new FormData();
     formData.append('productName', this.productForm.get('productName')?.value);
     formData.append('price', this.productForm.get('price')?.value);
     formData.append('category', this.productForm.get('category')?.value);
     formData.append('description', this.productForm.get('description')?.value);
     formData.append('brand', this.productForm.get('brand')?.value);

     const fileControl = this.productForm.get('photo')?.value;
     if (fileControl && fileControl instanceof File) {
       formData.append('photo', fileControl);
     }

     const productId = this.productId ? this.productId : Date.now().toString();

     if (this.isUpdateMode) {
       this.adminService.updateProduct(formData, productId).subscribe(() => {
         this.loadProducts();
         this.router.navigate(['/home']);
       });
     } else {
       this.adminService.addProduct(formData).subscribe(() => {
         this.loadProducts();
         this.router.navigate(['/home']);
       });
     }
  }

  deleteProduct(id: object): void {
    this.adminService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  editProduct(product: IProduct): void {
    this.isUpdateMode = true;
    this.productId = product.id.toString();
    this.productForm.patchValue(product);
  }
}
