import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../../_services/cart.service";
import {AuthService} from "../../../../_services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppUser} from "../../../../_models/AppUser.model";
import {CartService2} from "../../../../_services/cart2.service";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  public appUser!:AppUser;
  id!:number;
  statuDelivered: any;
  statuPending: any;
  statuCanceled: any;
  statuCreate: any;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private cartService:CartService,
    private cartService2:CartService2,
    private accountService:AuthService,
  ) {
    this.id= this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCustomerById();
    this.getStatusCreate();
    this.getStatusCanceled();
    this.getStatusPending();
    this.getStatusDelivered();
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
  getStatusCreate(){
    this.cartService.getCommadeBystatusCreate(this.id,0,1000).subscribe(
      value => {
        console.log(value)
        this.statuCreate=value.content.length;
      },error => {
        console.log(error);
      }
    )
  }
  getStatusCanceled(){
    this.cartService.getCommadeBystatusCanceled(this.id,0,1000).subscribe(
      value => {
        console.log(value)
        this.statuCanceled=value.content.length;
      },error => {
        console.log(error);
      }
    )
  }
  getStatusPending(){
    this.cartService.getCommadeBystatusPending(this.id,0,1000).subscribe(
      value => {
        console.log(value)
        this.statuPending=value.content.length;
      },error => {
        console.log(error);
      }
    )
  }
  getStatusDelivered(){
    this.cartService.getCommadeBystatusDelivered(this.id,0,1000).subscribe(
      value => {
        console.log(value)
        this.statuDelivered=value.content.length;
      },error => {
        console.log(error);
      }
    )
  }
}
