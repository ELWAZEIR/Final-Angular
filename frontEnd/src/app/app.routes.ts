import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ErrorComponent } from './error/error.component';
import { CheckoutComponent} from './chek-out/chek-out.component';
import { userGuard } from './gaurds/userGuard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchResultsComponent } from './search/search.component';
// import {commponent}
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent,canActivate:[userGuard]}, 
  { path: 'details/:id', component: DetailsProductComponent},
  { path: 'addProduct/:id', component: AddProductComponent },
  
  { path: 'checkout', component: CheckoutComponent },
  { path: 'addProduct', component: AddProductComponent  ,canActivate:[userGuard]},
  { path: 'search', component: SearchResultsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component:ErrorComponent },
  { path: '**', component:ErrorComponent },
];
