import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alayout',
  templateUrl: './alayout.component.html',
  styleUrls: ['./alayout.component.css']
})
export class AlayoutComponent implements OnInit {
  public currentSideMenu:number=0;
  public menus = [
    {"name":"Dashboard","url":"dashboard","icon":"fa fa-tachometer"},
    {"name":"Clients","url":"dashboard/listcustomers","icon":"fa fa-users"},
    {"name":"Commandes","url":"dashboard/commandes","icon":"fa fa-table"},
    {"name":"Réservations","url":"dashboard/reservations","icon":"fa fa-table"},
    {"name":"Evènements","url":"dashboard/calendar","icon":"fa fa-calendar-check-o"},
    {"name":"Messages","url":"dashboard/messages","icon":"fa fa-send"},
  ];

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0)
  }
  getCurrentMenu(i: number) {
    this.currentSideMenu=i;
  }
  onScrolToTop(){
    scroll(0,0);
  }
}
