import { Component, EventEmitter, OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  constructor(private productList: AddProductService, private router: Router){}
  icon=faTrash;
  editIcon= faEdit;
  productData: undefined | product[];
  successMessage: undefined  | string;
  productId= new EventEmitter<string| number>;
  ngOnInit() : void {
      this.list();
  }
  deleteProduct(id: number | string) {
    this.productList.removeProduct(id).subscribe(result=>{
      if(result) {
        this.successMessage = 'product is successfully deleted'
        this.list();
      }
    })
    setTimeout(() => {
      this.successMessage = undefined;
    }, 3000);

  }
  list() {
    this.productList.showProduct().subscribe(result=>{
      console.log(result)
    if(result) {
      this.productData = result;
    }
    })
  }
  editProduct(id:any) {
    console.log(id)
  }
}
