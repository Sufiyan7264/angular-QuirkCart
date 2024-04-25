import {OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from '../services/add-product.service';
import { product } from '../data-type';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { cart } from '../data-type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  icon=faCartShopping;
  cartData : product | undefined;
  removeToCart: boolean = false;
  ProductDetail: undefined | product[];
  constructor(private route: ActivatedRoute, private product : AddProductService){}
  productQuantity: number=1;
  ngOnInit() : void {
    let productId=this.route.snapshot.paramMap.get('id');
    productId &&  this.product.getProductDetail(productId).subscribe(result=>{
        this.ProductDetail = result;
        let cartData = localStorage.getItem('localCart');
        if(cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item:product)=>productId === item.id.toString())
          if(items.length) {
            this.removeToCart= true;
          }
          else{
            this.removeToCart = false;
          }
        }

        let user = localStorage.getItem('users')
        if(user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);

          this.product.cartData.subscribe(result=>{
            let items = result.filter((item:product)=>productId?.toString()===item.ProductId?.toString())
            if(items.length) {
              this.cartData = items[0]
              this.removeToCart = true;
            }

            })
          }
        })
      }
  handleQuantity(val: string) {
    if(this.productQuantity <20 && val==='plus')
      {
        this.productQuantity++;
      }
      else if (this.productQuantity >1 && val === 'min')
      {
        this.productQuantity--;
      }
  }
  RemoveToCart(id:number) {
    if(!localStorage.getItem('users')){
      this.product.removeItemFromCart(id)
      
    }
    else{
      this.cartData && this.product.removeToCart(this.cartData?.id).subscribe(result=>{
        let user = localStorage.getItem('users');
        let userId = user && JSON.parse(user).id
        this.product.getCartList(userId)
      })
    }
    this.removeToCart = false;
  }
  AddToCart() {
      if(this.ProductDetail) {
        console.log(this.ProductDetail);
        this.ProductDetail[0].quantity=this.productQuantity;
        if(!localStorage.getItem('users'))
          {
            this.product.localAddtoCart(this.ProductDetail[0])
            this.removeToCart = true;
          }
        else{
          let user = localStorage.getItem('users')
          let userId = user && JSON.parse(user).id;
          console.log(userId);
          console.log(this.ProductDetail)
          let cartData: cart = {
           ...this.ProductDetail[0],
           userId,
           ProductId : this.ProductDetail[0].id

          }
          delete cartData.id;
          this.product.viewCart(cartData).subscribe(result=>{
            if(result) {
              this.product.getCartList(userId);
              this.removeToCart=true;
            }
          })
        }
      }
    }
}
