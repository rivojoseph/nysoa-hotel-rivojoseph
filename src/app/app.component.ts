import {Component, OnInit} from '@angular/core';
import {TokenService} from "./_services/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'inventory-front';
  constructor(
    private tokenService:TokenService,
  ) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token!=null){
      this.tokenService.parseJWT();
      this.tokenService.getAppUserByUsername()
    }
  }

}
