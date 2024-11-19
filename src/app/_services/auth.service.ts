import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../_models/user.model";
import {Observable} from "rxjs";
import {TokensModel} from "../_models/tokens.model";

import {AppUser} from "../_models/AppUser.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host = environment.host;
  appUser!:AppUser;
  constructor(
    private http:HttpClient,
  ) { }

  public getAuth(credentials:UserModel):Observable<TokensModel>{
    return this.http.post<TokensModel>(this.host+"/login",credentials);
  }

  getNewToken():Observable<TokensModel>{
    let header = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('refreshtoken')});
    return this.http.get<TokensModel>(this.host+"/refreshToken",{headers:header});
  }

  singUp(credentials:AppUser):Observable<AppUser>{
    return this.http.post<AppUser>(this.host+"/register",credentials);
  }
  addRoleByCustomer(appUser:AppUser):Observable<any>{
    return this.http.post<any>(this.host+"/addRoleByCustomer",appUser);
  }

  getUserByUserName(username:string):Observable<AppUser>{
    return this.http.get<AppUser>(this.host+"/user/getbyusername/"+username);
  }
  getOnCustomer(id:number):Observable<AppUser>{
    return this.http.get<AppUser>(this.host+"/user/getone/"+id);
  }
  getprofile():Observable<any>{
    return this.http.get<any>(this.host+"/porfile");
  }
}
