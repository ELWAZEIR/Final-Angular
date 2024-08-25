import { inject, Injectable } from '@angular/core';
import { IUser } from '../app/models/Iuser';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user:BehaviorSubject<boolean>
  constructor(private http: HttpClient, private router: Router) {
  //initial value
this.user=new BehaviorSubject<boolean>(this.isUserLogged)
}




  // logInUser Observable<any>(user:IUser){
  //   let userToken:Observable<IUser>http.post("http://localhost:5000/api/v1/ng/users/login",  {user})

  //   localStorage.setItem('userToken',userToken)
  //   this.user.next(true)
  //   this.router.navigateByUrl('/products')
  //   console.log(user);
  // }
   logInUser(user: IUser) {
    console.log(user);
    this.http.post<{ token: string ,role:string}>("http://localhost:5000/api/v1/ng/auth/login", user, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
        next: (response) => {
         
          const userToken = response.token;
          const role=response.role
          console.log(role);
          localStorage.setItem('userToken', JSON.stringify(userToken)); 
          localStorage.setItem('role', JSON.stringify(role));// localStorage.setItem('userToken', userToken);
          this.user.next(true);
          this.router.navigateByUrl('/home');
          console.log(user);
        },
        error: (error) => {
          console.error("Login failed", error);
        }
      });
  }
  signUpUser(user: IUser) {
    console.log(user);
    this.http.post<{ token: string }>("http://localhost:5000/api/v1/ng/auth/signup", user, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
        next: (response) => {
          console.log(response);
          // const userToken = response.token;
          // localStorage.setItem('userToken', userToken);
           this.user.next(true);
          this.router.navigateByUrl('/login');
          console.log(user);
        },
        error: (error) => {
  
            console.error("Signup failed", error);
            console.error("Error details:", error.error); 
        
        }
      });
  }
  get isUserLogged() {
    return typeof localStorage !== 'undefined' && localStorage.getItem('userToken') ? true : false;
  }
  getUserState():Observable<boolean>{
    return this.user.asObservable()
  }
  get isUserAdmin() {
    return localStorage.getItem('role')==="admin" ? true : false; 
  }
  logout(){
    localStorage.removeItem('userToken');
    this.user.next(false)
    this.router.navigateByUrl('/login');
  }
}
