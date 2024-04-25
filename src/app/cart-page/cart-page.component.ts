import { Component, OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartData: cart[] | undefined
  cartSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    totalPrice: 0
  }
  constructor(private product: AddProductService, private route: Router){}
ngOnInit() : void {
  this.loadDetail()
}
checkout() {
  this.route.navigate(['checkout'])

}
removeToCart(cartId: number | undefined) {
  cartId && this.cartData && this.product.removeToCart(cartId).subscribe(result=>{
   this.loadDetail()
  })
}
loadDetail() {
  this.product.currentCart().subscribe(result=>{
    if(result) {
      this.cartData = result;
      let price =0
      result.forEach((item)=>{
        if(item.quantity)
        price = price + (+item.price*item.quantity);
        price = Math.floor(price);
        console.log(price);
      })
      this.cartSummary.price = price;
      this.cartSummary.discount = Math.floor(price/10);
      this.cartSummary.tax = Math.floor(price/10);
      this.cartSummary.delivery = 100;
      this.cartSummary.totalPrice = price+(price/10) + 100 -(price/10);

      console.log(this.cartSummary)
      if(!this.cartData.length) {
        this.route.navigate(['/'])
      }
    }
  })
}
}

