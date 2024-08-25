
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import this if you're using forms
import { RouterModule } from '@angular/router';
import "./navbar.component.css"
import { AuthService } from '../auth.service';
import { RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../iproduct';
import { IProductResponse } from '../iproduct-response';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterModule,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Fixed typo: styleUrl should be styleUrls
})
export class NavbarComponent implements OnInit {
  accountOpen = false;
  helpOpen = false;
  // data:IProductResponse[]=[]
  products: IProductResponse[] = [];
  categoriesOpen = false;
  searchQuery: string = ''; // Property to hold the search query
  // http://localhost:5000/api/v1/products/search?productName=example


  //GET ITEM
  // signup:string='Signup';
  //  login :string='Login'
  // token:any;
  // role:string='';
  
    
  // console.log({val});
  constructor(private router: Router ,private authServ: AuthService,private productsServ: ProductsService,private http: HttpClient) {}

  toggleDropdown(menu: string): void {
    this.accountOpen = menu === 'account' ? !this.accountOpen : false;
    this.helpOpen = menu === 'help' ? !this.helpOpen : false;
    this.categoriesOpen = menu === 'categories' ? !this.categoriesOpen : false;
  }

performSearch(): void {
  if (this.searchQuery.trim()) {


    this.productsServ.searchProducts(this.searchQuery).subscribe({
      next: (response) => {
        this.products = response;
        console.log("Search results:", response);
        // You can handle the response here, like updating the view or storing the results
      },
      error: (error) => {
        console.error("Search failed:", error);
      }
    });}
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  

  // performSearch(): void {
  //   if (this.searchQuery.trim()) {
  //     // Navigate to the search results page with the search query as a parameter
  //     this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  //     console.log("Search query:", this.searchQuery);

  //   }
  // }\
  }
logout(){
    this.authServ.logout()
  }
isAdmin(){
  return  this.authServ.isUserAdmin
} 
    isLogged!:boolean;
    ngOnInit(): void {
      this.authServ.getUserState().subscribe((state)=>{
        this.isLogged=state
      })
        
}
isAdminAndLogged(){
  return this.authServ.isUserAdmin && this.isLogged
}
}
