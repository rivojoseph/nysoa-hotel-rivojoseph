import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../../_services/token.service";
import {AppUser} from "../../../_models/AppUser.model";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {CartService2} from "../../../_services/cart2.service";
import {StatusCommande} from "../../../_enums/StatusCommande";

@Component({
  selector: 'app-eevenements',
  templateUrl: './eevenements.component.html',
  styleUrls: ['./eevenements.component.css']
})
export class EevenementsComponent implements OnInit {
  id!: number;
  appUser!:AppUser;
  events:any=[];
  calendarOptions: CalendarOptions={
    plugins: [
      dayGridPlugin,
      interactionPlugin
    ]
  };
  constructor(
    private token:TokenService,
    private cartService:CartService2,
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
    this.getReservationByUser();
  }
  getReservationByUser(){
    this.cartService.getAllChambreByUser(this.id).subscribe(
      value => {
        console.log(value);
        for (let i=0;i<value.length;i++){

            let ev={
              title:"N°"+value[i].chambre.numeroChambre,
              start:value[i].start.toString(),
              end:value[i].end.toString(),
              color:"#0825b6"
            }
            this.events.push(ev);

          this.calendarOptions= {
            initialView: 'dayGridMonth',
            editable: false, // important for activating event interactions!
            selectable: false, // important for activating date selectability!
            weekends: true,
            events: this.events,
          };
          console.log(this.events[i])
        }
      },error => {
        console.log(error)
      }
    )
  }

}
