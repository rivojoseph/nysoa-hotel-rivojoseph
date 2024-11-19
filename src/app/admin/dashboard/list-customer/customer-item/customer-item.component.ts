import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../../_services/cart.service";
import {Commande} from "../../../../_models/Commande.model";
import {AuthService} from "../../../../_services/auth.service";

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent implements OnInit {
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
    private accountService:AuthService,
  ) {
    this.id= this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
     this.getCommandeByCustomer();
     this.getCustomerById();
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
  getCustomerById(){
     this.accountService.getOnCustomer(this.id).subscribe(
       value => {
            this.appUser=value;
            console.log(this.appUser);
       },error => {
         console.log(error);
       }
     )
  }

  retour() {
    this.router.navigateByUrl("admin/dashboard/listcustomers")
  }
}
