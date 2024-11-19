import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../_services/auth.service";

@Component({
  selector: 'app-eprofile',
  templateUrl: './eprofile.component.html',
  styleUrls: ['./eprofile.component.css']
})
export class EprofileComponent implements OnInit {

  constructor(
    private auth:AuthService,
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }


  getProfile(){
    this.auth.getprofile().subscribe(
      value => {
        console.log(value)
      },error => {
        console.log(error)
      }
    )
  }
}
