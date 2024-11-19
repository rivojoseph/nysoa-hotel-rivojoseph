import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from "../../../_services/menu.service";
import {FormBuilder, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import {CategoryService} from "../../../_services/category.service";
import {CategoryMenu} from "../../../_models/CategoryMenu.model";
import {Menu} from "../../../_models/Menu.model";

@Component({
  selector: 'app-m-add',
  templateUrl: './m-add.component.html',
  styleUrls: ['./m-add.component.css']
})
export class MAddComponent implements OnInit {
  @Input() public currenteCat:any;
  public menu!: Menu;
  public errormesage!: string;
  public formMenu!: FormGroup;


  constructor(
    private catService: CategoryService,
    private menuSevice: MenuService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.initializeFormgroup();
  }

  onHandleAddMenu() {
    const menu: Menu = new Menu();

    if (this.formMenu.invalid) return;
    menu.name= this.formMenu.get('name')?.value;
    menu.ingredient= this.formMenu.get('ingredient')?.value;
    menu.prix= this.formMenu.get('prix')?.value;
    menu.promo= this.formMenu.get('promo')?.value;
    menu.prixpromo= this.formMenu.get('prixpromo')?.value;
    menu.vailable= true;
    menu.selected= 0;
    menu.photoName= "uncknowphoto.png";
    menu.categoryMenu= this.currenteCat;
    this.menuSevice.addMenu(menu).subscribe(
      value => {
        alert("Menu ajouter avec succée!");
        console.log(menu);
        this.menu = value;
      }, error => {
        console.log(error);
        console.log(menu);
        this.errormesage = error;
      });
  }

  initializeFormgroup(){
    this.formMenu = this.fb.group({
      name: this.fb.control("", [Validators.required, Validators.minLength(4), Validators.maxLength(35)]),
      ingredient: this.fb.control("", [Validators.required]),
      prix: this.fb.control( [Validators.required, Validators.min(100), Validators.max(600000)]),
      promo: this.fb.control(false),
      prixpromo: this.fb.control(0),
      vailable: this.fb.control(true),
      selected: this.fb.control(0),
      photoName: this.fb.control("uncknowphoto.png"),
      categoryMenu: this.fb.control([Validators.required])
    });
  }

}

