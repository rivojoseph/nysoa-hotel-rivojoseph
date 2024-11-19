import {Component, OnInit} from '@angular/core';
import {Commande} from "../../../_models/Commande.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../_services/cart.service";
import {AuthService} from "../../../_services/auth.service";
import {StatusCommande} from "../../../_enums/StatusCommande";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  public commandes!:Commande[];
  public commande!:Commande;
  public appUser!:any;
  numberOfElements!: number;
  totalElements!: number;
  totalPages?:number;
  visible:boolean=false;
  pages?:Array<any>;
  public currentePage: number=0;
  private size: number=10;
  statuDelivered: any;
  statuPending: any;
  statuCanceled: any;
  statuCreate: any;
  statuCREATED!:StatusCommande;
  enums: StatusCommande=StatusCommande.CREATED;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private cartService:CartService,
    private accountService:AuthService,
  ) { }

  ngOnInit(): void {
    this.getCommandeByCreated();
  }
  initialized(){
    this.visible=false;
  }
  getCommandeByCreated() {
    this.cartService.getCommadeByCreate(this.currentePage, this.size).subscribe(
    value => {
      console.log(value)
      this.commandes=value.content;
      this.totalPages=value.totalPages;
      this.pages=Array<any>(value.totalPages);
      this.totalElements=value.totalElements;
      this.numberOfElements=value.numberOfElements;
      this.initialized();
    },error => {
      console.log(error)
      }
    )
  }
  getCommandeByCanceled() {
    this.cartService.getCommadeByCanceled(this.currentePage, this.size).subscribe(
      value => {
        console.log(value)
        this.commandes=value.content;
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
        this.initialized();
      },error => {
        console.log(error)
      }
    )
  }
  getCommandeByPending() {
    this.cartService.getCommadeByPending(this.currentePage, this.size).subscribe(
      value => {
        console.log(value)
        this.commandes=value.content;
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
        this.initialized();
      },error => {
        console.log(error)
      }
    )
  }
  getCommandeByDelivered() {
    this.cartService.getCommadeByDelivered(this.currentePage, this.size).subscribe(
      value => {
        console.log(value)
        this.commandes=value.content;
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
        this.initialized();
      },error => {
        console.log(error)
      }
    )
  }
  onPage(i: number) {
    this.currentePage =i;
    if(this.enums==StatusCommande.CREATED){
      this.getCommandeByCreated();
    }else if(this.enums==StatusCommande.PENDING){
      this.getCommandeByPending();
    }else if(this.enums==StatusCommande.DELIVERED){
      this.getCommandeByDelivered();
    }else if(this.enums==StatusCommande.CANCELED){
      this.getCommandeByCanceled();
    }
  }
  onPrev(){
    this.currentePage--;
    if(this.enums==StatusCommande.CREATED){
      this.getCommandeByCreated();
    }else if(this.enums==StatusCommande.PENDING){
      this.getCommandeByPending();
    }else if(this.enums==StatusCommande.DELIVERED){
      this.getCommandeByDelivered();
    }else if(this.enums==StatusCommande.CANCELED){
      this.getCommandeByCanceled();
    }
  }
  onNext(){
    this.currentePage++;
    if(this.enums==StatusCommande.CREATED){
      this.getCommandeByCreated();
    }else if(this.enums==StatusCommande.PENDING){
      this.getCommandeByPending();
    }else if(this.enums==StatusCommande.DELIVERED){
      this.getCommandeByDelivered();
    }else if(this.enums==StatusCommande.CANCELED){
      this.getCommandeByCanceled();
    }
  }

  getMenuItem(id: number) {
    this.cartService.getDeyailCommande(id).subscribe(
      value => {
        this.commande=value;
        this.visible=true;
      },error => {
        console.log(error);
      }
    );
  }

  getCreated() {
    this.enums=StatusCommande.CREATED;
    console.log(this.enums)
    this.getCommandeByCreated();
  }

  getPending() {
    this.enums=StatusCommande.PENDING;
    console.log(this.enums)
    this.getCommandeByPending();

  }

  getDelivered() {
    this.enums=StatusCommande.DELIVERED;
    console.log(this.enums)
    this.getCommandeByDelivered();

  }

  getCanceled() {
    this.enums=StatusCommande.CANCELED;
    console.log(this.enums)
    this.getCommandeByCanceled();

  }

  getModifCreated(c:Commande) {
     this.cartService.editeCommandCreated(c.id,c).subscribe(
       value => {
         this.commande=value;
         this.getCreated();
       },error => {
         console.log(error);
       }
     )
  }

  getModifPending(c:Commande) {
    this.cartService.editeCommandPending(c.id,c).subscribe(
      value => {
        this.commande=value;
        this.getPending();
      },error => {
        console.log(error);
      }
    )
  }

  getModifDelivered(c:Commande) {
    this.cartService.editeCommandDelivered(c.id,c).subscribe(
      value => {
        this.commande=value;
        this.getDelivered();
      },error => {
        console.log(error);
      }
    )
  }

  getModifCanceled(c:Commande) {
    this.cartService.editeCommandCanceled(c.id,c).subscribe(
      value => {
        this.commande=value;
        this.getCanceled();
      },error => {
        console.log(error);
      }
    )
  }
}
