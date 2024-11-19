import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Menu} from "../_models/Menu.model";
import {CategoryMenu} from "../_models/CategoryMenu.model";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public host = environment.host;

  constructor(
    private http:HttpClient
  ) { }

  public getMenu():Observable<Menu[]>{
    return this.http.get<Menu[]>(this.host+'/menu/listmenu');
  }

  public getMenuByCategory(cat:CategoryMenu):Observable<any>{
    return this.http.get<any>(this.host+'/menu/listmenByCat/'+cat.idCatM+'?page=0&size=100');
  }
  public getOneMenu(idMen:any):Observable<Menu>{
    return this.http.get<Menu>(this.host+'/menu/onemenu/'+idMen);
  }

  public addMenu(menu:Menu):Observable<Menu>{
    return this.http.post<Menu>(this.host+'/menu/addmenu/',menu);
  }


  public editMenu(id:any,menu:Menu):Observable<Menu>{
    return this.http.put<Menu>(this.host+'/menu/editmenu/'+id,menu);
  }

  public deleteMenu(m:Menu):Observable<any>{
    return  this.http.delete<any>(this.host+'/menu/deletemenu/'+m.idMen);
  }
  public modifValable(id:any,vailable:boolean):Observable<Menu>{
    return this.http.put<Menu>(this.host+'/menu/modifvailable/'+id,vailable);

  }


  uploadPhotoVoiture(file: File, idMen: number | undefined): Observable<HttpEvent<any>> {
    let formdata: FormData = new FormData();
    formdata.append('file',file);
    const req = new HttpRequest('POST',this.host+'/uploadMenu/'+idMen,formdata,{
      reportProgress:true,
      responseType:'json'
    });
    return this.http.request(req);
  }
}
