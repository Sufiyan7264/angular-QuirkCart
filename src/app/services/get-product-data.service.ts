import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class GetProductDataService {
  updateUrl= 'http://localhost:3000/product';
  constructor(private http : HttpClient) { }
  getProductData(id: any){
    return this.http.get<product>(this.updateUrl+`/${id}`);
  }
  updateProductData(data: product) {
    return this.http.put<product>(`${this.updateUrl}/${data.id}`,data);
  }
}
