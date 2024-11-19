import { Injectable } from '@angular/core';
import {Caddy} from "../_models/Caddy.model";
import {MenuItem} from "../_models/Menu-Item.model";
import {Menu2} from "../_models/Menu2.model";

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  public currentCaddyName:string="Caddy1";
  public listCaddies:Array<{num:number,name:string}>=[{num:1,name:'caddy1'}];
  public caddies:Map<String,Caddy> = new Map();


  constructor() {

    let caddy = new Caddy(this.currentCaddyName);
    this.caddies.set(this.currentCaddyName,caddy);

    this.caddies.get(this.currentCaddyName)!=new Caddy(this.currentCaddyName);
    let cadies= localStorage.getItem('myCaddies');

  }

  public addMenuToCaddy(menu:Menu2):void{
    let caddy = this.caddies.get(this.currentCaddyName);
    let menuItem:MenuItem = caddy!.items.get(menu.idMen!)!;
    if(menuItem){
      menuItem.quantity!+=menu.qantite;
    }else {
      menuItem = new MenuItem();
      menuItem.prix=menu.prix;
      menuItem.quantity=menu.qantite;
      menuItem.menu=menu;
      caddy!.items.set(menu.idMen!,menuItem);
    }
    this.savePanier();
  }
  public removeMenuItem(id:number){
    let caddy=this.caddies.get(this.currentCaddyName);
    // @ts-ignore
    delete caddy.items[id];
    this.savePanier();
  }
  public getCurrentCaddy(){
    return this.caddies.get(this.currentCaddyName);
  }


  public getTotal():number{
    let items:IterableIterator<MenuItem> = this.getCurrentCaddy()!.items.values();
    let total=0;
    for (let pi of items){
      total+=pi.prix!*pi.quantity!;
    }
    return  total;
  }

  public savePanier(){
    let caddy=this.caddies.get(this.currentCaddyName);
    localStorage.setItem('myCaddies',JSON.stringify(caddy));
  }

}
















