import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../_services/cart.service";
import {Commande} from "../../../_models/Commande.model";
import {TokenService} from "../../../_services/token.service";

@Component({
  selector: 'app-ecommandes',
  templateUrl: './ecommandes.component.html',
  styleUrls: ['./ecommandes.component.css']
})
export class EcommandesComponent implements OnInit {

  public commandes!:Commande[];
  public commande!:Commande;
  public appUser!:any;
  numberOfElements!: number;
  totalElements!: number;
  totalPages?:number;
  pages?:Array<any>;
  public currentePage: number=0;
  private size: number=10;
  id!:number;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private cartService:CartService,
    private token:TokenService,
  ) {

  }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token!=null){
      this.token.parseJWT();
      this.token.getAppUserByUsername()
      this.appUser =this.token.appUser
      this.id= this.token.appUser.id;
      console.log(this.id)
    }
    this.getCommandeByCustomer();
  }
  getCommandeByCustomer(){
    this.cartService.getCommandeByCustomer(this.id,this.currentePage,this.size).subscribe(
      value => {
        console.log(value)
        this.commandes=value.content;
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
      },error => {
        console.log(error)
      });
  }
  onPage(i: number) {
    this.currentePage =i;
    this.getCommandeByCustomer();
  }
  onPrev(){
    this.currentePage--;
    this.getCommandeByCustomer();
  }
  onNext(){
    this.currentePage++;
    this.getCommandeByCustomer();
  }

  getMenuItem(id: number) {
    this.cartService.getDeyailCommande(id).subscribe(
      value => {
        this.commande=value;
        console.log(value);
      },error => {
        console.log(error);
      }
    );
  }
}
