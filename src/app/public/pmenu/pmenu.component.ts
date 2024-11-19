import { Component, OnInit } from '@angular/core';
import {CaddyService} from "../../_services/caddy.service";
import {CartService} from "../../_services/cart.service";
import {Cart} from "../../_models/Cart.model";
import {Menu} from "../../_models/Menu.model";
import {TokenService} from "../../_services/token.service";
import {CartService2} from "../../_services/cart2.service";

@Component({
  selector: 'app-pmenu',
  templateUrl: './pmenu.component.html',
  styleUrls: ['./pmenu.component.css']
})
export class PmenuComponent implements OnInit {


  public currentMenu:number=0;
  public menus = [
    {"name":"Home","url":""},
    {"name":"Réservation","url":"listchambres"},
    {"name":"Menues","url":"listmenus"},
    {"name":"Services","url":"listproduits"},
    {"name":"Contacte","url":"contact"}
  ];
  public cartData:any;
    constructor(
    public cartService:CartService,
    public cartService2:CartService2,
    public tokenService:TokenService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')!=null){
      this.tokenService.parseJWT();
      console.log(this.tokenService.isAuthenticated());
    }
  }


  getCurrentMenu(i: number) {
    this.currentMenu=i;
  }


}
