import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../_services/token.service";

@Component({
  selector: 'app-monespace',
  templateUrl: './monespace.component.html',
  styleUrls: ['./monespace.component.css']
})
export class MonespaceComponent implements OnInit {

  public currentSideMenu:number=0;

  public menus = [
    {"name":"Profile","url":"eprofile","icon":"fa fa-tachometer"},
    {"name":"Commandes","url":"ecommandes","icon":"fa fa-table"},
    {"name":"Réservations","url":"ereservations","icon":"fa fa-table"},
    {"name":"Evènements","url":"eevenement","icon":"fa fa-calendar-check-o"},
    {"name":"Messages","url":"emessages","icon":"fa fa-send"},
  ];
  constructor(
    private token:TokenService,
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    const token = localStorage.getItem('token');
    if (token!=null){
      this.token.parseJWT();
      this.token.getAppUserByUsername()
    }
  }
  getCurrentMenu(i: number) {
    this.currentSideMenu=i;
  }
  onScrolToTop(){
    scroll(0,0);
  }

}
