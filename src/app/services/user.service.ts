import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { logIn, product, signUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url= "http://localhost:3000/users";
  invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient,private router: Router) { }
  getUser(user: signUp) {
    this.http.post(this.Url,user,{observe: 'response'}).subscribe((result)=>{
      if(result){
        localStorage.setItem('users',JSON.stringify(result.body))
        this.router.navigate(['/']);
      }
    })
  }
  reloadUser() {
    if(localStorage.getItem('users')){
      this.router.navigate(['/'])
    }
  }
  loginUser(data:logIn) {
    return this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
      if(result && result.body) {
        localStorage.setItem('users',JSON.stringify(result.body[0]));
        this.router.navigate(['/'])
        this.invalidUserAuth.emit(false)
      }
      else{
        this.invalidUserAuth.emit(true)
      }
    })
  }
}
