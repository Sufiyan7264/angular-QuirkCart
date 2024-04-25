import { Component } from '@angular/core';
import { product } from '../data-type';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  successProductMessage: string | undefined;
  constructor(private sellerProduct: AddProductService) {}
  submitProduct(data:product) {
    this.sellerProduct.saveProduct(data).subscribe(result=>{
      console.log(result)
      if(result) {
        this.successProductMessage = "Product is added successfully";
      }
    });
    setTimeout(() => {
      this.successProductMessage= undefined;
    }, 3000);
  }

}
