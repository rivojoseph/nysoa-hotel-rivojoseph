import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Cart2} from "../_models/Cart2.model";
import {DatePipe} from "@angular/common";
import {Reservation} from "../_models/Reservation.model";
import {Observable} from "rxjs";
import {ChambreItem} from "../_models/ChambreItem.model";
import {Commande} from "../_models/Commande.model";
import {StatusCommande} from "../_enums/StatusCommande";


@Injectable({
  providedIn: 'root'
})
export class CartService2 {

  public cart:Cart2[]=[];
  public cartData2:any= {len:0,cost:0}
  public host = environment.host;
  constructor(
    private http:HttpClient,
    private datePipe:DatePipe,
  ) {
     this.getCartStorage();
  }

  public getCartStorage(){
    let cart= localStorage.getItem('myCart2');
    if (cart){
      this.cart = JSON.parse(cart);
    }
    this.updateDataCart();
  }

  public updateDataCart() {
    let len=0;
    let cost=0;
    this.cart.forEach(element =>{
        len += element.number!;
        cost += (element.total!)*(1-(element.discout!/100))*element.number!;
    });
    this.cartData2={len,cost};
    localStorage.setItem('myCart2',JSON.stringify(this.cart));
  }

  public addChambreToCart(newCart:Cart2):void{
    const checkedhambre = this.cart.find(element =>element.chambre!.id == newCart.chambre!.id);
    if (checkedhambre){
      checkedhambre.number!++;
      let dated = new Date(checkedhambre.start!).getTime();
      let datef = dated!+((86400000)*checkedhambre.number!)
      checkedhambre.end= this.datePipe.transform(datef,'yyyy-MM-dd');
    }else {
      this.cart.push(newCart);
    }
    this.updateDataCart();
  }

  public deleteFromCart(menuToDelet:Cart2):void{
    const indexMenu = this.cart.findIndex(element => element.chambre!.id == menuToDelet.chambre!.id);
      console.log('index: '+indexMenu+' umber: ');
      if (this.cart[indexMenu].number!>1){

        this.cart[indexMenu].number!--;
        let dated = new Date(this.cart[indexMenu].start!).getTime();
        let datef = dated!+((86400000)*this.cart[indexMenu].number!)
        this.cart[indexMenu].end= this.datePipe.transform(datef,'yyyy-MM-dd');

      }else {
        this.cart.splice(indexMenu,1);
      }
    this.updateDataCart();
  }
  clearCart(){
    this.cart.splice(0,this.cart.length)
    this.updateDataCart();
  }
  //rest api
  creatReservation(idUser:number):Observable<Reservation>{
    return this.http.post<Reservation>(this.host+"/reservation/createReservation",idUser);
  }
  addChambreItem(chamb:ChambreItem):Observable<any>{
    return this.http.post<any>(this.host+"/chambreItem/additem",chamb);
  }
  getReservationbyCustomer(id:number,page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/reservation/reservationByUser/"+id+"?page="+page+"&size="+size)
  }
  getDeyailReservation(id:number):Observable<Reservation>{
    return this.http.get<Reservation>(this.host+"/reservation/getoneReservation/"+id);
  }
  canceledStatus(id:number):Observable<Reservation>{
    return this.http.put<Reservation>(this.host+"/reservation/edituser"+id,StatusCommande.CANCELED)
  }
  createdStatus(id:number):Observable<Reservation>{
    return this.http.put<Reservation>(this.host+"/reservation/edituser"+id,StatusCommande.CREATED)
  }
  delete(id:number){
    this.http.delete(this.host+"/reservation/delete/"+id)
  }
  getAllChambreByUser(id:number):Observable<ChambreItem[]>{
    return this.http.get<ChambreItem[]>(this.host+"/chambreItem/chambreItemListByUser/"+id)
  }

  getReserVationByCreate(page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/reservation/statusCreate?page="+page+"&size="+size);
  }
  getReserVationByCanceled(page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/reservation/statusCanceled?page="+page+"&size="+size);
  }
  getReserVationByPending(page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/reservation/statusPending?page="+page+"&size="+size);
  }
  getReserVationByDelivered(page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/reservation/statusDelivered?page="+page+"&size="+size);
  }
  getReservationByStatus(status:StatusCommande):Observable<ChambreItem[]>{
    return this.http.get<ChambreItem[]>(this.host+"/chambreItem/byStatus/"+status);
  }
  getAllChambreItem(){
    return this.http.get<ChambreItem[]>(this.host+"/chambreItem/findAll");
  }
}

























































