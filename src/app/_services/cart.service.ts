import { Injectable } from '@angular/core';
import {Cart} from "../_models/Cart.model";
import {Menu} from "../_models/Menu.model";
import {AppUser} from "../_models/AppUser.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Commande} from "../_models/Commande.model";
import {MenuItem} from "../_models/Menu-Item.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart:Cart[]=[];
  public cartData:any= {len:0,cost:0}
  public host = environment.host;
  constructor(
    private http:HttpClient,
  ) {
     this.getCartStorage();
  }

  public getCartStorage(){
    let cart= localStorage.getItem('myCart');
    if (cart){
      this.cart = JSON.parse(cart);
    }
    this.updateDataCart();
  }

  public updateDataCart() {
    let len=0;
    let cost=0;
    this.cart.forEach(element =>{
        len += element.number;
        cost += element.menu.prix!*(1-(element.menu.prixpromo!/100))*element.number;
    });
    this.cartData={len,cost};
    localStorage.setItem('myCart',JSON.stringify(this.cart));
  }

  public addMenuToCart(newMenu:Menu):void{
    const checkedMenu = this.cart.find(element =>element.menu.idMen == newMenu.idMen);

    if (checkedMenu){
      checkedMenu.number++;
    }else {
      const newMenuToCart={
        number:1,
        menu:newMenu
      };
      this.cart.push(newMenuToCart);
    }
    this.updateDataCart();
  }

  public deleteFromCart(menuToDelet:Menu):void{
    const indexMenu = this.cart.findIndex(element => element.menu.idMen == menuToDelet.idMen);
      console.log('index: '+indexMenu+' umber: ');
      if (this.cart[indexMenu].number>1){

        this.cart[indexMenu].number--;

      }else {
        this.cart.splice(indexMenu,1);
      }
    this.updateDataCart();
  }

  addMenuToCart2(number: number, menu: Menu) {
    const checkedMenu = this.cart.find(element =>element.menu.idMen == menu.idMen);

    if (checkedMenu){
      checkedMenu.number+=number;
    }else {
      const newMenuToCart={
        number:number,
        menu:menu
      };
      this.cart.push(newMenuToCart);
    }
    this.updateDataCart();
  }
  clearCart(){
    this.cart.splice(0,this.cart.length)
    this.updateDataCart();
  }
//rest api
  createCommande(appUser:AppUser):Observable<Commande>{
     return this.http.post<Commande>(this.host+"/commande/addcommande",appUser);
  }
  sendProductItims(menuItem:MenuItem):Observable<any>{
    return this.http.post<any>(this.host+"/menuItem/addMenuItem",menuItem);
  }

  getCommandeByCustomer(id:number,page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/commandeByCustomer/"+id+"?page="+page+"&size="+size);
  }
  getCommandeByCustomerRole(role:string,page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/commandeByCustomerRole/"+role+"?page="+page+"&size="+size);
  }
  getDeyailCommande(id:number):Observable<Commande>{
    return this.http.get<Commande>(this.host+"/commande/detail/"+id);
  }

  countCommandeByCustomer(appUser:AppUser){
    return this.http.get(this.host+"/commande/countCommande/"+appUser.id);
  }
  getCommadeBystatusCreate(id:number,page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/statusCreate/"+id+"?page="+page+"&size="+size);
  }
  getCommadeBystatusCanceled(id:number,page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/statusCanceled/"+id+"?page="+page+"&size="+size);
  }
  getCommadeBystatusPending(id:number,page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/statusPending/"+id+"?page="+page+"&size="+size);
  }
  getCommadeBystatusDelivered(id:number,page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/statusDelivered/"+id+"?page="+page+"&size="+size);
  }
  getCommadeByCreate(page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/statusCreate?page="+page+"&size="+size);
  }
  getCommadeByCanceled(page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/statusCanceled?page="+page+"&size="+size);
  }
  getCommadeByPending(page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/statusPending?page="+page+"&size="+size);
  }
  getCommadeByDelivered(page:number,size:number):Observable<any>{
    return this.http.get<any>(this.host+"/commande/statusDelivered?page="+page+"&size="+size);
  }
  editeCommandCreated(idCom:number,command:Commande):Observable<Commande>{
    return this.http.put<Commande>(this.host+"/commande/editCreated/"+idCom,command);
  }
  editeCommandPending(idCom:number,command:Commande):Observable<Commande>{
    return this.http.put<Commande>(this.host+"/commande/editPending/"+idCom,command);
  }
  editeCommandDelivered(idCom:number,command:Commande):Observable<Commande>{
    return this.http.put<Commande>(this.host+"/commande/editDelivered/"+idCom,command);
  }
  editeCommandCanceled(idCom:number,command:Commande):Observable<Commande>{
    return this.http.put<Commande>(this.host+"/commande/editCanceled/"+idCom,command);
  }
}

























































