import { Component,OnInit } from '@angular/core';
import { GetProductDataService } from '../services/get-product-data.service'; 
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  getProductData: product | undefined;
  updateProductMessage: undefined | string;
  constructor(private getUpdate: GetProductDataService,private route: ActivatedRoute) {}
  ngOnInit() : void{
    let ProductId = this.route.snapshot.paramMap.get('id')
    console.log(ProductId)
    this.getUpdate.getProductData(ProductId).subscribe(result=>{
      console.log(result)
      if(result) {
        this.getProductData = result;
      }
    })
  }
  updateProduct(data:product)
  {
    if(this.getProductData) {
      data.id = this.getProductData.id;
    }
    console.log(data.id)
    this.getUpdate.updateProductData(data).subscribe(result=>{
      if(result){
        this.updateProductMessage= "Product successfully updated"
      }
    })
    setTimeout(() => {
      this.updateProductMessage= undefined;
    }, 3000);
 
  }
}
