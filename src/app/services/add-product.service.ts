import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { coerceStringArray } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  cartData = new EventEmitter<product[] | []>();
  productUrl= "http://localhost:3000/product";
  cartUrl= "http://localhost:3000/cart";
  orderUrl = "http://localhost:3000/orders"
   
  constructor(private http: HttpClient) { }
  saveProduct(data: product) {
    return this.http.post(this.productUrl,data);
  }
  showProduct() {
    return this.http.get<product[]>(this.productUrl);
  }
  removeProduct(id: number| string){
    return this.http.delete(`${this.productUrl + `/${id}`}`);
  }
  getproductInfo() {
    return this.http.get<product[]>(this.productUrl+`?_limit=3`);
  }
  getTrendyProduct() {
    return this.http.get<product[]>(this.productUrl+`?_limit=8`);
  }
  getSearchProduct(query: string) {
    console.log(this.productUrl+`?q=${query}`)
    return this.http.get<product[]>(this.productUrl+`?q=${query}`);
  }

  getProductDetail(id:any) {
    return this.http.get<product[]>(this.productUrl+`?id=${id}`);
  }
  localAddtoCart(data: product) {
    let cartStore = [];
    let cartData = localStorage.getItem('localCart');
    if(!cartData) {
      localStorage.setItem('localCart',JSON.stringify([data]))
      this.cartData.emit([data])
    }
    else{
      cartStore= JSON.parse(cartData);
      cartStore.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartStore));
    }
    this.cartData.emit(cartStore);
  }
  removeItemFromCart(id: number) {
    let cartVal = localStorage.getItem('localCart')
    if(cartVal) {
      let items : product[] = JSON.parse(cartVal)
      items = items.filter((item: product)=>id !== item.id)
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items)
    }
  }
  viewCart(cartData: cart){
    return this.http.post(this.cartUrl,cartData);
  }
  getCartList(userId: number) {
    return this.http.get<product[]>(this.cartUrl+`?userId=${userId}`,{observe: 'response'}).subscribe(result=>{
      if(result && result.body) {
        this.cartData.emit(result.body);
      }
    })
  }
  removeToCart(cartId: number) {
    return this.http.delete(this.cartUrl+`/${cartId}`);
  }
  currentCart() {
    let cartStore = localStorage.getItem('users')
    let cartData = cartStore &&  JSON.parse(cartStore).id;
    return this.http.get<cart[]>(this.cartUrl+`?userId=${cartData}`)
  }
  getOrder(data: order) {
    return this.http.post(this.orderUrl,data);
  }
  getOrderList() {
    let users = localStorage.getItem('users')
    let userid = users && JSON.parse(users).id
    return this.http.get<order[]>(this.orderUrl+`?userId=${userid}`)
  }
  deleteCartItems(cartId: number) {
    return this.http.delete(this.cartUrl+`/${cartId}`).subscribe(result=>{
      this.cartData.emit([])

    })
  }
  deleteOrder(orderId: number){

    return this.http.delete(this.orderUrl+`/${orderId}`)
  }
  removetoCart(cartId: number) {
    
  } 
}
