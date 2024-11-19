import { Injectable } from '@angular/core';
import {TokensModel} from "../_models/tokens.model";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AppUser} from "../_models/AppUser.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public token!:TokensModel;
  username!:string;
  role!:Array<string>;
  appUser!:AppUser;
  constructor(
    private route:Router,
    private authService:AuthService,
    ) { }

  saveToken(token:TokensModel):void{
    localStorage.setItem('token',token["access-token"]);
    localStorage.setItem('refreshtoken',token["refresh-token"]);
    this.route.navigate(['home']);
    this.parseJWT();
    this.getAppUserByUsername();
  }
  isLogin():boolean{
    const token = localStorage.getItem('token');
    return !! token;
  }
  clearToken(){
    let conf = confirm("Voulez-vous déconnecté maintenant?");
    if (!conf) return
    localStorage.removeItem('token');
    localStorage.removeItem('refreshtoken');
    this.route.navigate(['/']);
    this.role=[];
  }
  getToken():string | null{
    return localStorage.getItem('token');
  }

  clearTokenExpied() {
    localStorage.removeItem('token');
    this.route.navigate(['auth']);
  }

  getAndSaveNewToken(){
    this.authService.getNewToken().subscribe(
      value => {
        this.token=value;
        localStorage.setItem('token',this.token["access-token"]);
        localStorage.setItem('refreshtoken',this.token["refresh-token"]);
      },error => {
        console.log(error);
      }
    );
  }

  parseJWT(){
    let jwtHelper=new JwtHelperService();
    const token = localStorage.getItem('token');
    let objJWT = jwtHelper.decodeToken(token!);
    this.username=objJWT.sub;
    this.role=objJWT.roles;
  }
  isAdmin(){
    if (this.role.indexOf('ADMIN')>=0){
      return true;
    }else
    return false;
  }
  isUser(){
    if (this.role.indexOf('USER')>=0){
      return true;
    }else
      return false;
  }

  isAuthenticated(){
    return this.role && (this.isAdmin() || this.isUser() || this.isCustomer());
  }

  isCustomer() {
    if (this.role.indexOf('CUSTOMER')>=0){
      return true;
    }else
      return false;
  }

  getAppUserByUsername() {
    this.authService.getUserByUserName(this.username).subscribe(
      value => {
        this.appUser = value;
      },error => {
        console.log(error)
      }
    );

  }


}
