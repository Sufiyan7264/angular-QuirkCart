import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logIn, signUp } from '../data-type';
import { BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  sellerName: string = '';
  url = "http://localhost:3000/seller";
  errorLogin = new EventEmitter<boolean>(false);
  isSellerLoggedIn =new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,private router: Router) { }

  saveSeller(data: signUp) {
    return this.http.post(this.url,data,{observe: 'response'}).subscribe((result)=>{
      if(result){
        // this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
    })
  }
  reloadSeller() {
    if(localStorage.getItem('seller'))
      {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
      }
  }
  sellerLogin(data: logIn) {
    return this.http.get(this.url + `?email=${data.email}&password=${data.password}`,{observe: 'response'}).subscribe((result: any)=>{
      console.warn('result',result)
      if(result && result.body && result.body.length===1) {
        this.errorLogin.emit(false);
        localStorage.setItem('seller',JSON.stringify(result.body[0]))
        this.router.navigate(['seller-home'])
      }
      else{
       this.errorLogin.emit(true);
      }
    })

  }
}
