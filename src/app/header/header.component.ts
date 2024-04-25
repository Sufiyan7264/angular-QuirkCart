import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProductService } from '../services/add-product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userType: string = 'default';
  sellerName: string = "";
  userName: string = "";
  constructor(private router : Router, private product: AddProductService) {}

  cartLength =0;
  ngOnInit () : void {
    this.router.events.subscribe((val: any)=>{
      if(val.url) {
        // console.log('value', val)
        if(localStorage.getItem('seller') && val.url.includes('seller'))
          {
            let sellerStore = localStorage.getItem('seller');
            let sellerData =sellerStore && JSON.parse(sellerStore)
            this.sellerName = sellerData.name;
            console.log('sellername',this.sellerName)
            this.userType = 'seller';
          }
        else if(localStorage.getItem('users')){
            let userStore = localStorage.getItem('users');
            let userData = userStore && JSON.parse(userStore)
            this.userName = userData.name;
            this.userType = 'users';
            this.product.getCartList(userData.id);
        }
        else{
          this.userType = 'default';
        }
      }
    })
  let cartData = localStorage.getItem('localCart')
  if(cartData) {
  this.cartLength = JSON.parse(cartData).length;
  }
  this.product.cartData.subscribe(item=>{
    this.cartLength = item.length;
  })
}
  logoutSeller() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  
  userLogout() {
    localStorage.removeItem('users');
    this.router.navigate(['user-auth']);
    this.product.cartData.emit([])
  }
  searchProduct(query: KeyboardEvent) {
    if(query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value)
      this.product.getSearchProduct(element.value).subscribe(result=>{
        console.log(result);
      })
    }
  }

}
