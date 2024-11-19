import { Component, OnInit } from '@angular/core';
import {CartService} from "../../_services/cart.service";
import {Cart} from "../../_models/Cart.model";

@Component({
  selector: 'app-playout',
  templateUrl: './playout.component.html',
  styleUrls: ['./playout.component.css']
})
export class PlayoutComponent implements OnInit {

  constructor(
    public cartService:CartService
  ) { }

  ngOnInit(): void {
    this.cartService.getCartStorage();
  }
  onScrolToTop(){
    scroll(0,0);
  }
}
