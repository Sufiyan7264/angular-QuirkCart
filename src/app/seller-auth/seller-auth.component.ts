import { Component, OnInit } from '@angular/core';
import { logIn, signUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  isSellerLogIn = false;
  ErrorLogin: string | undefined = '';
  ErrorSignUp: string = '';
  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  getSubmit(data: signUp): void {
    if (
      data.email.includes('.com') &&
      data.name.length >= 1 &&
      data.password.length >= 1
    ) {
      this.seller.saveSeller(data);
    } else {
      this.ErrorSignUp = 'please fill the required field';
    }
  }
  getLogin(data: logIn): void {
    this.seller.sellerLogin(data);
    this.seller.errorLogin.subscribe((result) => {
      if (result) {
        this.ErrorLogin = 'Email or Password is incorrect';
      }
    });
  }
  openLogIn() {
    this.isSellerLogIn = true;
  }
  openSignUp() {
    this.isSellerLogIn = false;
  }
}
