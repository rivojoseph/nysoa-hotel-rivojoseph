import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {CategoryMenu} from "../_models/CategoryMenu.model";
import {CategoryChambre} from "../_models/CategoryChambre.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private host = environment.host;
  constructor(
    private Http:HttpClient
  ) { }

  public getCategoryMenu():Observable<CategoryMenu[]>{
    return this.Http.get<CategoryMenu[]>(this.host+'/category/listcatmenu');
  }
  public addCatmen(catm:CategoryMenu):Observable<CategoryMenu>{
    return this.Http.post<CategoryMenu>(this.host+'/category/addcatmen',catm)
  }
  //++++++++++++++++++++++++++++++++++++++
  public getCategoryChambre():Observable<CategoryChambre[]>{
    return this.Http.get<CategoryChambre[]>(this.host+'/category/listcatcham');
  }
  public addCatcham(catc:CategoryChambre):Observable<CategoryChambre>{
    return this.Http.post<CategoryChambre>(this.host+'/category/addcatcham',catc);
  }
}
