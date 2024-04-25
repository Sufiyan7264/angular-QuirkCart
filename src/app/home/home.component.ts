import { Component, OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { product } from '../data-type';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { ResourceLoader } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  icon= faCartShopping;
  infoIcon= faCircleInfo;
  trendingProduct: undefined | product[];
  popularProduct: undefined | product[];
  constructor(private product: AddProductService, private router: Router) {}

  ngOnInit() : void {
    this.product.getproductInfo().subscribe(result=>{
      this.popularProduct= result;
    })
    this.product.getTrendyProduct().subscribe(result=>{
      console.log('trand', result);
      if(result) {
        this.trendingProduct = result;
      }
    })
  }
  getproductDetails(id:number| string) {
    console.log(id);
    if(id) {
      this.router.navigate([`product-detail/${id}`]);
    }

  }
  getproductDetail(id:number |string) {
    this.router.navigate([`product-detail/${id}`])
  }
}
