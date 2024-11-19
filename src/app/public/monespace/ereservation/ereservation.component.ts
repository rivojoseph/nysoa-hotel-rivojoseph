import { Component, OnInit } from '@angular/core';
import {Reservation} from "../../../_models/Reservation.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../../_services/token.service";
import {CartService2} from "../../../_services/cart2.service";

@Component({
  selector: 'app-ereservation',
  templateUrl: './ereservation.component.html',
  styleUrls: ['./ereservation.component.css']
})
export class EreservationComponent implements OnInit {

  public reservations1!:Reservation[];
  public reservation!:Reservation;
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
    private cartService:CartService2,
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
    this.getReservationByCustomer();
  }

  private getReservationByCustomer() {
    this.cartService.getReservationbyCustomer(this.id,this.currentePage,this.size).subscribe(
      value => {
        console.log(value)
        this.reservations1=value.content;
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
      },error => {
        console.log(error);
      });
  }
  onPage(i: number) {
    this.currentePage =i;
    this.getReservationByCustomer();
  }
  onPrev(){
    this.currentePage--;
    this.getReservationByCustomer();
  }
  onNext(){
    this.currentePage++;
    this.getReservationByCustomer();
  }

  getMenuItem(id: number) {
    this.cartService.getDeyailReservation(id).subscribe(
      value => {
        this.reservation=value;
        console.log(value);
      },error => {
        console.log(error);
      }
    );
  }
}
