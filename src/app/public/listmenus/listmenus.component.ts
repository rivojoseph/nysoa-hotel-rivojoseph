import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../_services/category.service";
import {CategoryMenu} from "../../_models/CategoryMenu.model";
import {MenuService} from "../../_services/menu.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Menu} from "../../_models/Menu.model";
import {CaddyService} from "../../_services/caddy.service";
import {Menu2} from "../../_models/Menu2.model";
import {CartService} from "../../_services/cart.service";


@Component({
  selector: 'app-listmenus',
  templateUrl: './listmenus.component.html',
  styleUrls: ['./listmenus.component.css']
})
export class ListmenusComponent implements OnInit {

  public catmenu!:CategoryMenu[] ;
  public errormesage!:string;
  public formPanier!:FormGroup;
  public currenteCat!: CategoryMenu;
  public menulist!: Menu[];
  public totalElement!: number;

  constructor(
    private catChamServ:CategoryService,
    private menuSevice:MenuService,
    private fb:FormBuilder,
    private caddyService:CaddyService,
    private cartService:CartService,

  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
     this.getAllCatMen();
     this.getALlMenus();
     this.initialisationForm();
  }

  showSuccess() {

  }

  public getAllCatMen(){
    this.catChamServ.getCategoryMenu().subscribe(
       value => {
         this.catmenu=value;
       }   ,error => {
         console.log(error);
         this.errormesage=error;
      }
    );
  }


  initialisationForm(){
    this.formPanier = this.fb.group({
      quantite: this.fb.control(1,[Validators.required,Validators.min(1),Validators.max(20)])
    });
  }

  onSelectCat(c: CategoryMenu) {
    this.currenteCat=c;
    this.menuSevice.getMenuByCategory(c).subscribe(
      value => {
        this.menulist=value.content;
        this.totalElement=value.totalElements;
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    )
  }

  getALlMenus(){
    this.menuSevice.getMenu().subscribe(
      value => {
        this.menulist=value;
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }

    )
  }

  /*+++++++++++++cart++++++++*/
  addToCart(menu:Menu){
    let number = this.formPanier.get('quantite')?.value;
    if (number!=0){
      this.cartService.addMenuToCart2(number,menu);
    }
    this.initialisationForm();
  }

  deleteToCart(menu:Menu){
    this.cartService.deleteFromCart(menu);
  }

}
