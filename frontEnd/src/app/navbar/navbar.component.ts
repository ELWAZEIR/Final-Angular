
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import this if you're using forms
import { RouterModule } from '@angular/router';
import "./navbar.component.css"
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Fixed typo: styleUrl should be styleUrls
})
export class NavbarComponent {
  accountOpen = false;
  helpOpen = false;
  categoriesOpen = false;
  searchQuery: string = ''; // Property to hold the search query

  constructor(private router: Router) {}

  toggleDropdown(menu: string): void {
    this.accountOpen = menu === 'account' ? !this.accountOpen : false;
    this.helpOpen = menu === 'help' ? !this.helpOpen : false;
    this.categoriesOpen = menu === 'categories' ? !this.categoriesOpen : false;
  }

  performSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to the search results page with the search query as a parameter
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
      console.log("Search query:", this.searchQuery);

    }
  }
}

