import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../models/Iuser';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
 templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  formData:  IUser = {} as IUser;
  http = inject(HttpClient);
  formGroup:FormGroup = new FormGroup({});
  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.formGroup= new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      gender: new FormControl('', [
        Validators.required,
        // Validators.min(1),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  addNewUser() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      console.log('Form data:', formData); // Log the data being sent
      this.authServ.signUpUser(formData);
    }
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }
  get fullName() {
    return this.formGroup.get('fullName');
  }
  get age() {
    return this.formGroup.get('age');
  }
  get gender() {
    return this.formGroup.get('gender');
  }
  get address() {
    return this.formGroup.get('address');
  }
}

