
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
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  paginatedProducts: IProduct[] = [];
  categories: string[] = [];
  brands: string[] = [];
  selectedCategory: string = '';
  selectedBrand: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedSort: string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  constructor(
    private _productsService: ProductsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();

  }

  // Load products based on the current page and items per page
  loadProducts(): void {
    this._productsService.getData(this.currentPage, this.itemsPerPage).subscribe((response) => {
      this.products = response.data;
      this.filteredProducts = this.products;

      // Extract unique categories and brands for filtering options
      this.categories = [...new Set(this.products.map((product) => product.category))];
      this.brands = [...new Set(this.products.map((product) => product.brand))];

      // Handle pagination response (total pages)
      this.totalPages = response.totalPages;

      // Update pagination
      this.updatePagination();
    });
  }

  filterProducts() {
    // Ensure minPrice and maxPrice are not negative
    if (this.minPrice !== null && this.minPrice < 0) {
      this.minPrice = 0;
    }
    if (this.maxPrice !== null && this.maxPrice < 0) {
      this.maxPrice = 0;
    }

    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const matchesBrand = this.selectedBrand ? product.brand === this.selectedBrand : true;
      const matchesPrice =
        (!this.minPrice || product.price >= this.minPrice) &&
        (!this.maxPrice || product.price <= this.maxPrice);

      return matchesCategory && matchesBrand && matchesPrice;
    });

    this.sortProducts();
    this.updatePagination();
  }

  sortProducts() {
    if (this.selectedSort === 'price') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'priceDesc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if (this.selectedSort === 'popularity') {
      this.filteredProducts.sort((a, b) => b.popularity - a.popularity);
    }
    this.updatePagination();
  }

  // Reset filters
  resetFilters() {
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedSort = '';
    this.filterProducts();
  }

  addToCart(product: IProduct) {
    this._productsService.addToCart(product);
  }

  // Pagination logic
  updatePagination() {
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts(); // Fetch products for the selected page
    }
  }

  get totalPagesArray() {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

}
