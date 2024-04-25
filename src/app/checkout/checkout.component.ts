import { Component } from '@angular/core';
import { cart, order } from '../data-type';
import { AddProductService } from '../services/add-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
 totalPrice : number |undefined;
  constructor(private product: AddProductService,private route : Router) {}
  orderData: cart[] | undefined;
  orderMsg : string | undefined;
  ngOnInit() : void {
    this.product.currentCart().subscribe(result=>{
        let price =0
        this.orderData = result;
        result.forEach((item)=>{
          if(item.quantity)
          price = price + (+item.price*item.quantity);
          price = Math.floor(price);
          console.log(price);
        })
        this.totalPrice = price+(price/10) + 100 -(price/10);
  
        console.log(this.totalPrice)
      })
    }
  orderNow(data:order){
    let user = localStorage.getItem('users')
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice) {
      let orderdata: order = {
        ...data,
        userId,
        totalPrice: this.totalPrice,
        id: undefined
      }
      this.orderData?.forEach((item) =>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 500);
      })
      this.product.getOrder(orderdata).subscribe(result=>{
        if(result) {
        this.orderMsg = "Order has been placed"
        setTimeout(() => {
          this.orderMsg = undefined;
          this.route.navigate(['my-orders'])
        }, 3000);
        }
      })
    }
  }

}
