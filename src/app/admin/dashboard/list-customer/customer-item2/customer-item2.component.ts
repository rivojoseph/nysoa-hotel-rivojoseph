import { Component, OnInit } from '@angular/core';
import {Reservation} from "../../../../_models/Reservation.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService2} from "../../../../_services/cart2.service";
import {TokenService} from "../../../../_services/token.service";
import {AuthService} from "../../../../_services/auth.service";

@Component({
  selector: 'app-customer-item2',
  templateUrl: './customer-item2.component.html',
  styleUrls: ['./customer-item2.component.css']
})
export class CustomerItem2Component implements OnInit {
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
    private accountService:AuthService,
  ) {
    this.id= this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getReservationByCustomer();
    this.getCustomerById();
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
