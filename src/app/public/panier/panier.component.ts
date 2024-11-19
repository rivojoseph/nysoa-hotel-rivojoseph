import { Component, OnInit } from '@angular/core';
import {CaddyService} from "../../_services/caddy.service";

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(
    public caddyService:CaddyService
  ) { }

  ngOnInit(): void {
  }

}
