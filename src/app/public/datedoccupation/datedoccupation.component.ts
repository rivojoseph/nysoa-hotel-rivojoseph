import { Component, OnInit } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {ActivatedRoute} from "@angular/router";
import {ChambreService} from "../../_services/chambre.service";
import {FullCalendarModule} from "@fullcalendar/angular";

FullCalendarModule.bind([
  interactionPlugin,
  dayGridPlugin,
])
@Component({
  selector: 'app-datedoccupation',
  templateUrl: './datedoccupation.component.html',
  styleUrls: ['./datedoccupation.component.css']
})
export class DatedoccupationComponent implements OnInit {
  events:any=[

  ];
  calendarOptions: CalendarOptions={
    plugins: [
      dayGridPlugin,
      interactionPlugin
    ]
  };

  id!:number;
  constructor(
    private route:ActivatedRoute,
    private chambreService:ChambreService,
  ) {
    this.id= this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.chambreService.getChambreItemByChaambre(this.id).subscribe(
      value => {
        console.log(value);
        for (let i=0;i<value.length;i++){
          let ev={
            title:"N°"+value[i].chambre.numeroChambre,
            start:value[i].start.toString(),
            end:value[i].end.toString(),
            color:"#FF0000"
          }
          this.events.push(ev);
          this.calendarOptions= {
            initialView: 'dayGridMonth',
            editable: true, // important for activating event interactions!
            selectable: true, // important for activating date selectability!
            weekends: true,
            events: this.events,
          };
          console.log(this.events[i])
        }
      },error => {
        console.log(error)
      }
    );

  }
}
