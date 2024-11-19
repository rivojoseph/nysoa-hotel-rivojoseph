import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../../_models/Reservation.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService2} from "../../../_services/cart2.service";
import {AuthService} from "../../../_services/auth.service";
import {StatusCommande} from "../../../_enums/StatusCommande";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  public reservations1!:Reservation[];
  public reservation!:Reservation;
  public appUser!:any;
  numberOfElements!: number;
  totalElements!: number;
  totalPages?:number;
  pages?:Array<any>;
  public currentePage: number=0;
  private size: number=10;
  enums: StatusCommande=StatusCommande.CREATED;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private cartService:CartService2,
    private accountService:AuthService,
  ) { }

  ngOnInit(): void {
    this.getReservationByCreated();
  }

  getReservationByCreated() {
    this.cartService.getReserVationByCreate(this.currentePage, this.size).subscribe(
      value => {
        console.log(value)
        this.reservations1=value.content;
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
      },error => {
        console.log(error)
      }
    )
  }

  getReservationByCanceled() {
    this.cartService.getReserVationByCanceled(this.currentePage, this.size).subscribe(
      value => {
        console.log(value)
        this.reservations1=value.content;
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
      },error => {
        console.log(error)
      }
    )
  }
  getReservationByPending() {
    this.cartService.getReserVationByPending(this.currentePage, this.size).subscribe(
      value => {
        console.log(value)
        this.reservations1=value.content;
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
      },error => {
        console.log(error)
      }
    )
  }
  getReservationByDelivered() {
    this.cartService.getReserVationByDelivered(this.currentePage, this.size).subscribe(
      value => {
        console.log(value)
        this.reservations1=value.content;
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
      },error => {
        console.log(error)
      }
    )
  }

  onPage(i: number) {
    this.currentePage =i;
    if(this.enums==StatusCommande.CREATED){
      this.getReservationByCreated();
    }else if(this.enums==StatusCommande.PENDING){
      this.getReservationByPending();
    }else if(this.enums==StatusCommande.DELIVERED){
      this.getReservationByDelivered();
    }else if(this.enums==StatusCommande.CANCELED){
      this.getReservationByCanceled();
    }
  }
  onPrev(){
    this.currentePage--;
    if(this.enums==StatusCommande.CREATED){
      this.getReservationByCreated();
    }else if(this.enums==StatusCommande.PENDING){
      this.getReservationByPending();
    }else if(this.enums==StatusCommande.DELIVERED){
      this.getReservationByDelivered();
    }else if(this.enums==StatusCommande.CANCELED){
      this.getReservationByCanceled();
    }
  }
  onNext(){
    this.currentePage++;
    if(this.enums==StatusCommande.CREATED){
      this.getReservationByCreated();
    }else if(this.enums==StatusCommande.PENDING){
      this.getReservationByPending();
    }else if(this.enums==StatusCommande.DELIVERED){
      this.getReservationByDelivered();
    }else if(this.enums==StatusCommande.CANCELED){
      this.getReservationByCanceled();
    }
  }

  getMenuItem(id: number,idus:number) {
    this.getCustomerById(idus);
    this.cartService.getDeyailReservation(id).subscribe(
      value => {
        this.reservation=value;
        console.log(value);
      },error => {
        console.log(error);
      }
    );
  }

  getCustomerById(idus:number){
    this.accountService.getOnCustomer(idus).subscribe(
      value => {
        this.appUser=value;
        console.log(this.appUser);
      },error => {
        console.log(error);
      }
    )
  }
  getCreated() {
    this.enums=StatusCommande.CREATED;
    this.getReservationByCreated();
  }

  getPending() {
    this.enums=StatusCommande.PENDING;
    this.getReservationByPending();
  }

  getDelivered() {
    this.enums=StatusCommande.DELIVERED;
    this.getReservationByDelivered();
  }

  getCanceled() {
    this.enums=StatusCommande.CANCELED;
    this.getReservationByCanceled();
  }
}
