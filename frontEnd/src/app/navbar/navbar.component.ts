import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import this if you're using forms
import { RouterModule } from '@angular/router'; // Import this if you're using routing
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  accountOpen = false;
  helpOpen = false;
  categoriesOpen = false;

  toggleDropdown(menu: string): void {
    this.accountOpen = menu === 'account' ? !this.accountOpen : false;
    this.helpOpen = menu === 'help' ? !this.helpOpen : false;
    this.categoriesOpen = menu === 'categories' ? !this.categoriesOpen : false;
  }
}
