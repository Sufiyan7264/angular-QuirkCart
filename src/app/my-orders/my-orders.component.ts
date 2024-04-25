import { Component,OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orderDataList: order[] | undefined;
constructor(private product: AddProductService) {}
  ngOnInit() : void {
    this.getListOrder()
  }
  removeOrder(orderId: number| undefined) {
    orderId && this.product.deleteOrder(orderId).subscribe(result=>{
      if(result) {
        this.getListOrder();
      }
    })
  }
  getListOrder() {
    this.product.getOrderList().subscribe(result=>{
      this.orderDataList = result;
    })
  }

}
