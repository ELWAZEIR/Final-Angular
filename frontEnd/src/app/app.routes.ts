import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'details/:id', component: DetailsProductComponent },
  { path: 'addProduct/:id', component: AddProductComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: '**', component:ErrorComponent },
];
