import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css',
})
export class DetailsProductComponent implements OnInit {
  id!: number;
  productDetails:any;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {
    this.id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this._ProductsService.getproductDetails(this.id).subscribe((product) => {
    this.productDetails = product    });
  }
}
