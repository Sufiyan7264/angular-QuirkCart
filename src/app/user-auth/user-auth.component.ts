import { Component,OnInit } from '@angular/core';
import { cart, logIn, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { JsonPipe } from '@angular/common';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  isLoggedIn: boolean = false ;
  authError: string = '';
  constructor(private userData: UserService,private product: AddProductService){}
  ngOnInit() : void {
    this.userData.reloadUser();
  }
  userSignUp(user:signUp) {
      this.userData.getUser(user);
  }
  openLogIn() {
    this.isLoggedIn= true;
  }
  openSignUp() {
    this.isLoggedIn = false;
  }
  userLogIn(data: logIn) {
    this.userData.loginUser(data)
    this.userData.invalidUserAuth.subscribe(result=>{
      if(result){
        this.authError = "Please enter the valid user details"
      }
      else{
        this.localCartToRemoteCart()
      }
    })
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart') 
    let user = localStorage.getItem('users')
    let userId = user && JSON.parse(user).id
    if(data) {
      let cartData: product[] = JSON.parse(data);
      cartData.forEach((product:product, index) => {
        let cartItem: cart = {
          ...product,
          ProductId: product.id,
          userId
        }
        delete cartItem.id;
        setTimeout(() => {  
          
        this.product.viewCart(cartItem).subscribe(result=>{
          console.log(result);
        })
        }, 500);
        if(cartData.length === index+1)
          {
            localStorage.removeItem('localCart')
          }
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
       
    }, 2000);
  }
}
