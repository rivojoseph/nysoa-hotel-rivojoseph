import {Component, OnInit} from '@angular/core';
import {CartService} from "../../_services/cart.service";
import {Cart} from "../../_models/Cart.model";
import {MenuService} from "../../_services/menu.service";
import {Router} from "@angular/router";
import {Menu} from "../../_models/Menu.model";
import {TokenService} from "../../_services/token.service";
import {Commande} from "../../_models/Commande.model";
import {StatusCommande} from "../../_enums/StatusCommande";
import {AppUser} from "../../_models/AppUser.model";
import {MenuItem} from "../../_models/Menu-Item.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart:Cart[]=[]
  public timestamp!: number;
  public commande!:Commande;
  erreurMessage!: string;
  constructor(
    public cartService:CartService,
    public menuService:MenuService,
    public tokenService:TokenService,
    private route:Router
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.cart = this.cartService.cart;
    if(localStorage.getItem('token')!=null){
      this.tokenService.parseJWT();
      this.tokenService.getAppUserByUsername();
    }
  }

  getTs() {
    return this.timestamp;
  }

  navgateByUrl() {
    this.route.navigateByUrl('listmenus');
  }

  public addMenu(menu:Menu){
    this.cartService.addMenuToCart(menu);
  }
  deleteMenu(menu:Menu){
    this.cartService.deleteFromCart(menu);
  }

  creatCommande(cart: Cart[]) {
     if (this.tokenService.getToken()===null){
       alert("Vous n'été pas connecter!");
     }else {

       let appUser=this.tokenService.appUser;
        this.cartService.createCommande(appUser).subscribe(
          value => {
            this.commande = value;
            for (let c of cart){
              const menuItem:MenuItem = new MenuItem();
              menuItem.commande=this.commande;
              menuItem.menu=c.menu;
              menuItem.quantity=c.number;
              menuItem.prix=c.menu.prix;
              menuItem.discout=c.menu.prixpromo;
              console.log(menuItem.quantity);
              this.cartService.sendProductItims(menuItem).subscribe(
                value1 => {
                  console.log(value1);
                },error => {
                  console.log(error);
                  this.erreurMessage =error.message;
                }
              )
            }
            alert("Votre demmande est en cours de traitement!");
            this.route.navigateByUrl("monespace/ecommandes");
            this.cartService.clearCart();
          },error => {
            console.log(error);
            this.erreurMessage = error.message;
          }
        );
     }
  }

  clearCart() {
    let c =confirm("Vous-ête sûr de tout vider?")
    if (!c) return
    this.cartService.clearCart();
  }
}
