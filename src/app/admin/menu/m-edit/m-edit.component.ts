import {Component, Input, OnInit} from '@angular/core';
import {Menu} from "../../../_models/Menu.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../_services/category.service";
import {MenuService} from "../../../_services/menu.service";
import {CategoryMenu} from "../../../_models/CategoryMenu.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-m-edit',
  templateUrl: './m-edit.component.html',
  styleUrls: ['./m-edit.component.css']
})
export class MEditComponent implements OnInit {

  @Input() public currenteCat:any;
  public idMen!:string | null;
  public listeCat!:CategoryMenu[];
  public menu!: Menu;
  public errormesage!: string;
  public formMenu!: FormGroup;

  constructor(
    private catService: CategoryService,
    private menuSevice: MenuService,
    private fb: FormBuilder,
    private activated:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formMenu = this.fb.group({
      name: this.fb.control(this.menu?.name, [Validators.required, Validators.minLength(4), Validators.maxLength(35)]),
      ingredient: this.fb.control(this.menu?.ingredient, [Validators.required]),
      prix: this.fb.control(this.menu?.prix, [Validators.required, Validators.min(100), Validators.max(600000)]),
      promo: this.fb.control(this.menu?.promo),
      prixpromo: this.fb.control(this.menu?.prixpromo),
      vailable: this.fb.control(this.menu?.vailable),
      selected: this.fb.control(this.menu?.selected),
      photoName: this.fb.control(this.menu?.photoName),
      categoryMenu: this.fb.control(this.menu?.categoryMenu,[Validators.required])
    });

    this.idMen = this.activated.snapshot.paramMap.get('id');

    this.getOneMenu();

    this.getcategoryMenu();
  }

  onHandleModifMenu() {
    const menu: Menu = new Menu();

    if (this.formMenu.invalid) return;
    menu.name= this.formMenu.get('name')?.value;
    menu.ingredient= this.formMenu.get('ingredient')?.value;
    menu.prix= this.formMenu.get('prix')?.value;
    menu.promo= this.formMenu.get('promo')?.value;
    menu.prixpromo= this.formMenu.get('prixpromo')?.value;
    menu.vailable= this.menu.vailable;
    //menu.selected= 0;
    //menu.photoName= "uncknowphoto.png";
    menu.categoryMenu= this.formMenu.get('categoryMenu')?.value;
    this.menuSevice.editMenu(this.menu?.idMen,menu).subscribe(
      value => {
        alert("Menu modifier avec succée!");
        console.log(menu);
        this.menu = value;

      }, error => {
        console.log(error);
        console.log(menu);
        this.errormesage = error;
      });
  }
  getcategoryMenu(){
    this.catService.getCategoryMenu().subscribe(
      value => {
        this.listeCat=value;
      },error => {
        console.log(error);
        this.errormesage = error;
      }
    )
  }

  getcurrentcat(catmen: CategoryMenu) {
    this.currenteCat=catmen;
  }

  getOneMenu(){
    this.menuSevice.getOneMenu(this.idMen).subscribe(
      value => {
        this.menu=value;

        this.formMenu = this.fb.group({
          name: this.fb.control(this.menu?.name, [Validators.required, Validators.minLength(4), Validators.maxLength(35)]),
          ingredient: this.fb.control(this.menu?.ingredient, [Validators.required]),
          prix: this.fb.control(this.menu?.prix, [Validators.required, Validators.min(100), Validators.max(600000)]),
          promo: this.fb.control(this.menu?.promo),
          prixpromo: this.fb.control(this.menu?.prixpromo),
          vailable: this.fb.control(this.menu?.vailable),
          selected: this.fb.control(this.menu?.selected),
          photoName: this.fb.control(this.menu?.photoName),
          categoryMenu: this.fb.control(this.menu?.categoryMenu.idCatM,[Validators.required])
        });
      },error => {
        console.log(error);
      }
    );
  }
}
