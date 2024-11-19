import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../../_services/category.service";
import {Category} from "../../../models/Category";
import {CategoryMenu} from "../../../_models/CategoryMenu.model";

@Component({
  selector: 'app-p-add',
  templateUrl: './p-add.component.html',
  styleUrls: ['./p-add.component.css']
})
export class PAddComponent implements OnInit {

  public Cat!: Category[];
  public formProduct!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private CatServce:CategoryService
  ) { }

  ngOnInit(): void {
    this.getCat();
    this.formProduct=this.fb.group({
      name: this.fb.control(""),
      description: this.fb.control(""),
      price: this.fb.control(""),
      dateExpiration: this.fb.control(""),
      quantity: this.fb.control(""),
      promo: this.fb.control(false),
      prixpromo: this.fb.control(""),
      selected: this.fb.control(0),
      available: this.fb.control(true),
      category: this.fb.control(""),
    });
  }

  oneHandleProduct() {

  }

  onHandlePromo() {

  }

  onHandleVailable() {

  }

  private getCat() {

  }
}
