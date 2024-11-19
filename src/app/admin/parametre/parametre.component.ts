import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../_services/category.service";
import {CategoryMenu} from "../../_models/CategoryMenu.model";

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {
  public catm!:CategoryMenu;
  public formCatmen!:FormGroup;
  public errormesage: string="";
  constructor(
    private catService:CategoryService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
   this.formCatmen = this.fb.group({
       idCatM:this.fb.control(null),
       deco:this.fb.control(""),
       nameCat:this.fb.control(""),
       photoName:this.fb.control("")
   }
   )
  }

  public addcatmenu(){
    let catmen:CategoryMenu =  this.formCatmen.value;
    this.catService.addCatmen(catmen).subscribe(
      value => {
         this.catm=value;
      },error => {
        console.log(error);
        this.errormesage=error;
      }
    )
  }

  onAddCatmenu() {

  }
}
