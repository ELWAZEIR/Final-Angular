import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IProductResponse } from '../iproduct-response';
import { ProductsService } from '../products.service';
import { IProduct } from '../iproduct';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
// export class SearchResultsComponent {

// }



export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  products: IProduct[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient,private productsServ: ProductsService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    // this.http.get<any[]>(`http://localhost:5000/api/v1/ng/products/searchByName?${this.searchQuery}`, {
    //   params: { productName: this.searchQuery }
    if(this.searchQuery.trim()!==""){
    this.productsServ.searchProducts(this.searchQuery).subscribe((response) => {
      this.products = response.data;
    
      // this.products.data = response.data; 
      console.log('Products:', this.products); // Assuming the API returns an array of products
    }, error => {
      console.error('Error fetching products:', error);
    });}
    else{
      this.products = [];
  }
}
addToCart(product: IProduct) {
  this.productsServ.addToCart(product);
}
}