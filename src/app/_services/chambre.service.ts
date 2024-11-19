import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

import {Chambre} from "../_models/Chambre.model";
import {CategoryChambre} from "../_models/CategoryChambre.model";
import {ChambreItem} from "../_models/ChambreItem.model";


@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  public host = environment.host;

  constructor(
    private http:HttpClient
  ) { }

  public getChambre():Observable<Chambre[]>{
    return this.http.get<Chambre[]>(this.host+'/chambre/listchambre');
  }

  public getChambreByCategory(cham:CategoryChambre):Observable<any>{
    return this.http.get<any>(this.host+'/chambre/listchambycat/'+cham.idCatCham+'?page=0&size=100');
  }

  public getOneChambre(idCham:any):Observable<Chambre>{
    return this.http.get<Chambre>(this.host+'/chambre/onechambre/'+idCham);
  }

  public addChambre(chambre:Chambre):Observable<Chambre>{
    return this.http.post<Chambre>(this.host+'/chambre/addchambre/',chambre);
  }

  public editChambre(idCH:any,chambre:Chambre):Observable<Chambre>{
    return this.http.put<Chambre>(this.host+'/chambre/editchambre/'+idCH,chambre);
  }

  public deleteChambre(cha:Chambre):Observable<any>{
    return  this.http.delete<any>(this.host+'/chambre/deletechambre/'+cha.id);
  }
  public modifDisponible(id:any,disponible:boolean):Observable<Chambre>{
    return this.http.put<Chambre>(this.host+'/chambre/modifdisponible/'+id,disponible);

  }

  uploadPhotoVoiture(file: File, idCh: number | undefined): Observable<HttpEvent<any>> {
    let formdata: FormData = new FormData();
    formdata.append('file',file);
    const req = new HttpRequest('POST',this.host+'/uploadChambre/'+idCh,formdata,{
      reportProgress:true,
      responseType:'json'
    });
    return this.http.request(req);
  }

  getChambreItemByChaambre(id:number):Observable<ChambreItem[]>{
    return this.http.get<ChambreItem[]>(this.host+"/chambreItem/getByChambre/"+id);
  }
}
