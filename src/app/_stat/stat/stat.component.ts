import { Component, OnInit } from '@angular/core';
import {EventDriverService} from "../../_services/event.driver.service";
import {ActionEvent} from "../customer.state";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  counter:number=0;
  constructor(
    private eventDriverService:EventDriverService,
  ) { }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      ++this.counter;
    });
  }

}
