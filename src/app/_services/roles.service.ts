import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoleModel} from "../_models/Role.model";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private host = environment.host
  constructor(
    private http:HttpClient,
  ) { }

  getAllRolles():Observable<RoleModel[]>{
  return   this.http.get<RoleModel[]>(this.host+"/roles");
  }
  getAllUsersByRole(role:RoleModel,page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/users/"+role.roleName+"?page="+page+"&size="+size);
  }
}
