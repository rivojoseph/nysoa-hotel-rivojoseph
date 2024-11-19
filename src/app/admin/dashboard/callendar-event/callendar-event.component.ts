import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {CartService2} from "../../../_services/cart2.service";
import {ChambreItem} from "../../../_models/ChambreItem.model";
import {StatusCommande} from "../../../_enums/StatusCommande";

@Component({
  selector: 'app-callendar-event',
  templateUrl: './callendar-event.component.html',
  styleUrls: ['./callendar-event.component.css']
})
export class CallendarEventComponent implements OnInit {
  events:any=[];
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin
    ]
  };
  chambreItem!:ChambreItem[];
  status!:StatusCommande
  color!: string;
  constructor(
    private cartService:CartService2,
  ) { }

  ngOnInit(): void {
this.getAll()
  }

  /*onDateClick(res:{dateStr:string}){
    console.log(res)
    alert("you are click on: "+res.dateStr)

  }*/
  getAll(){
    this.cartService.getAllChambreItem().subscribe(
      value => {
        console.log(value)
      },error => {
        console.log(error)
      }
    )
  }

  getByStatus(){
    this.cartService.getReservationByStatus(this.status).subscribe(
      value => {
        this.events = new Array();
        console.log(value)
        this.chambreItem=value;
        for (let ci of value){
          let ev =  {
            title: ci.chambre.categoryChambre.nameCat+" N°"+ci.chambre.numeroChambre, start: ci.start.toString(),end:ci.end,color:this.color
          }
          this.events.push(ev)
          this.calendarOptions ={
            initialView: 'dayGridMonth',
            //editable: true, // important for activating event interactions!
            //selectable: true, // important for activating date selectability!
            weekends: true,
            //dateClick:this.onDateClick.bind(this),
            events: this.events
          }
        }

      },error => {
        console.log(error);
      }
    )
  }
  initialCalendar(){
    this.calendarOptions ={
      initialView: 'dayGridMonth',
      //editable: true, // important for activating event interactions!
      //selectable: true, // important for activating date selectability!
      weekends: true,
      //dateClick:this.onDateClick.bind(this),
      events: []
    }
  }
  getCreated() {
    this.status = StatusCommande.CREATED;
    this.color= '#031987'
    this.initialCalendar()
    this.getByStatus();
  }

  getPending() {
    this.status = StatusCommande.PENDING;
    this.color= '#7f7d03'
    this.initialCalendar()
    this.getByStatus();
  }

  getDelivered() {
    this.status = StatusCommande.DELIVERED;
    this.color= '#2f8703'
    this.initialCalendar()
    this.getByStatus();
  }

  getCanceled() {
    this.status = StatusCommande.CANCELED;
    this.color= '#870303'
    this.initialCalendar()
    this.getByStatus();
  }
}
