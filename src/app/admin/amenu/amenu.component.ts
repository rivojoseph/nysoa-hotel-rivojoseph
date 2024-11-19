import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../_services/token.service";
import {TokensModel} from "../../_models/tokens.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-amenu',
  templateUrl: './amenu.component.html',
  styleUrls: ['./amenu.component.css']
})
export class AmenuComponent implements OnInit {

  public currentMenu:number=0;
  public menus = [
    {"name":"Dashboard","url":"dashboard"},
    {"name":"Menues","url":"menu"},
    {"name":"Chambre","url":"chambre"},
    {"name":"Contacte","url":"contact"},
    {"name":"Configuration","url":""},
  ];
  constructor(
    public tokenService:TokenService,
  ) { }

  ngOnInit(): void {

  }
  getCurrentMenu(i: number) {
    this.currentMenu=i;
  }

  logout() {
    this.tokenService.clearToken();
  }

}
