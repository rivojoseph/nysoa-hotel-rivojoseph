import { Component, OnInit } from '@angular/core';

import {TokenService} from "../../_services/token.service";
import {Router} from "@angular/router";
import {CartService2} from "../../_services/cart2.service";
import {ChambreService} from "../../_services/chambre.service";
import {Cart2} from "../../_models/Cart2.model";
import {Reservation} from "../../_models/Reservation.model";
import {ChambreItem} from "../../_models/ChambreItem.model";

@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.css']
})
export class Cart2Component implements OnInit {

  public cart:Cart2[]=[]
  public reservations1!:Reservation[];
  public reservation!:Reservation;
  public timestamp!: number;
  erreurMessage!: string;

  constructor(
    public cartService2:CartService2,
    public chambreService:ChambreService,
    public tokenService:TokenService,
    private route:Router,
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.cart = this.cartService2.cart;
    if(localStorage.getItem('token')!=null){
      this.tokenService.parseJWT();
      this.tokenService.getAppUserByUsername();
    }
  }

  getTs() {
    return this.timestamp;
  }

  navgateByUrl() {
    this.route.navigateByUrl('listchambres');
  }
  public addCart2(cart:Cart2){
    this.cartService2.addChambreToCart(cart);
  }
  deleteMenu(cart:Cart2){
    this.cartService2.deleteFromCart(cart);
  }

  creatReservation(cart: Cart2[]) {
    if (this.tokenService.getToken()===null){
      alert("Vous n'été pas connecter!");
    }else {
      let appUser=this.tokenService.appUser;
      console.log(appUser)
      this.cartService2.creatReservation(appUser.id).subscribe(
        value => {
          this.reservation=value;
          console.log(this.reservation);
          for (let c of cart){
            const chambreitem:ChambreItem=new ChambreItem();
            chambreitem.prix=c.total;
            chambreitem.start=c.start;
            chambreitem.end=c.end;
            chambreitem.nombrenuit=c.number;
            chambreitem.nbadulte=c.nbadulte;
            chambreitem.nbenfant=c.nbenfant;
            chambreitem.isdeco=c.isdeco;
            chambreitem.issono=c.issono;
            chambreitem.discout=c.discout;
            chambreitem.chambre=c.chambre;
            chambreitem.reserver=this.reservation;
            this.cartService2.addChambreItem(chambreitem).subscribe(
              value1 => {
                console.log(value1);
              },error => {
                console.log(error);
                this.erreurMessage=error.message;
              }
            );
          }
          alert("Votre demmande est en cours de traitement!");
          this.route.navigateByUrl("monespace/ereservations");
          this.cartService2.clearCart();
        }
        ,error => {
          console.log(error);
          this.erreurMessage=error.message;
        }
      );
    }
  }

  clearCart() {
    let c =confirm("Vous-ête sûr de tout vider?")
    if (!c) return
    this.cartService2.clearCart();
  }
}
