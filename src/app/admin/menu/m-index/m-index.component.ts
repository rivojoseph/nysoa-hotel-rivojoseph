import { Component, OnInit } from '@angular/core';
import {Menu} from "../../../_models/Menu.model";
import {MenuService} from "../../../_services/menu.service";
import {CategoryMenu} from "../../../_models/CategoryMenu.model";
import {CategoryService} from "../../../_services/category.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {TokenService} from "../../../_services/token.service";

@Component({
  selector: 'app-m-index',
  templateUrl: './m-index.component.html',
  styleUrls: ['./m-index.component.css']
})
export class MIndexComponent implements OnInit {

  public menulist!:any;
  public errormesage!:string;
  public listeCat!:CategoryMenu[];
  public currenteCat!:any;
  public menu!:Menu;
  public totalElement!: number;
  public formEditMenu!:FormGroup;
  public ediPhoto!: boolean;
  public selectedFiles!: any;
  public progre!: number;
  private currentFileUpload!: File;
  public timestamp!: number;

  constructor(
    public menuSevice:MenuService,
    private catMenServ:CategoryService,
    public tokenService:TokenService,
    private  route:Router,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getCatmenlistemenu();
    this.initializeFormgroup();
    this.tokenService.parseJWT();
  }

  public  getlistemenu(){
    this.menuSevice.getMenu().subscribe(
      value => {
        this.menulist=value;
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    )
  }

  public  getCatmenlistemenu(){
    this.catMenServ.getCategoryMenu().subscribe(
      value => {
        this.listeCat=value;
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    )
  }


  public onHandleDelete(m: Menu) {
     let c = confirm("Vous-éte sûre de vouloire supprimer le Menu :"+m.name+"?")
     if (c!=true) return;
     this.menuSevice.deleteMenu(m).subscribe(
       value => {
         alert("Suppression avec succé!")
       this.onSelectCat(this.currenteCat);
       },error => {
         console.log(error);
         this.errormesage=error.message;
       }
     );
         // let index = this.menulist.indexOf(m);
         // this.menulist.splice(index,1);
         // this.totalElement = this.totalElement-1;
  }

  onHandleEdit(m: Menu) {
    this.menu = m;
    this.formEditMenu = this.fb.group({
      idMen:this.fb.control(this.menu?.idMen),
      name: this.fb.control(this.menu?.name, [Validators.required, Validators.minLength(4), Validators.maxLength(35)]),
      ingredient: this.fb.control(this.menu?.ingredient, [Validators.required]),
      prix: this.fb.control(this.menu?.prix, [Validators.required, Validators.min(100), Validators.max(600000)]),
      promo: this.fb.control(this.menu?.promo),
      prixpromo: this.fb.control(this.menu?.prixpromo),
      photoName: this.fb.control(this.menu?.photoName),
      categoryMenu: this.fb.control(this.menu?.categoryMenu.idCatM,[Validators.required])
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
    );
  }

  onHandleModifMenu() {
    const menu: Menu = new Menu();
    if (this.formEditMenu.invalid) return;
    menu.name= this.formEditMenu.get('name')?.value;
    menu.ingredient= this.formEditMenu.get('ingredient')?.value;
    menu.prix= this.formEditMenu.get('prix')?.value;
    menu.promo= this.formEditMenu.get('promo')?.value;
    menu.prixpromo= this.formEditMenu.get('prixpromo')?.value;
    menu.vailable= true;
    menu.selected= 0;
    //menu.photoName= "uncknowphoto.png";
    menu.categoryMenu= this.currenteCat;
    if (this.formEditMenu.get('idMen')?.value==0){
      this.menuSevice.addMenu(menu).subscribe(
        value => {
          alert("Menu ajouter avec succée!");
          this.menu = value;
          this.onSelectCat(this.menu.categoryMenu);
        }, error => {
          this.errormesage = error;
        });
    }else{
      this.menuSevice.editMenu(this.menu.idMen,menu).subscribe(
        (data:Menu)=>{
          this.onSelectCat(this.currenteCat);
          alert("Menu modifier avec succé");
        },error => {
          this.errormesage=error.message;
        }
      );
    }

  }

  getcurrentcat(catmen: CategoryMenu) {
    this.currenteCat=catmen;
  }

  initializeFormgroup(){
    this.formEditMenu = this.fb.group({
      idMen: this.fb.control(0),
      name: this.fb.control( null,[Validators.required, Validators.minLength(4), Validators.maxLength(35)]),
      ingredient: this.fb.control( null,[Validators.required]),
      prix: this.fb.control( null,[Validators.required, Validators.min(100), Validators.max(600000)]),
      promo: this.fb.control(false),
      prixpromo: this.fb.control(0,[Validators.max(99)]),
      selected: this.fb.control(0),
      photoName: this.fb.control("uncknowphoto.png"),
      categoryMenu: this.fb.control([Validators.required])
    });
  }

  onHandleModifValablbe(m: Menu) {
    let v = !m.vailable;
    this.menuSevice.modifValable(m.idMen,v).subscribe(
      value => {
        this.onSelectCat(this.currenteCat);
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    );
  }

  getphotomenu(m: any) {
    this.menu=m;
     this.progre=0;
  }

  onEdit() {
    this.ediPhoto=true;
    this.progre=0;
  }


  onChange($event: any) {
    this.selectedFiles = $event.target.files;
  }

  upload() {
    this.progre=0;
    // @ts-ignore
    const file:File = this.selectedFiles.item(0);
    this.currentFileUpload= file;
    this.menuSevice.uploadPhotoVoiture(this.currentFileUpload,this.menu.idMen).subscribe(event=>{
      if (event.type==HttpEventType.UploadProgress){
        // @ts-ignore
        this.progre = Math.round(100*event.loaded/event.total);
      }else if (event instanceof HttpResponse){
        this.timestamp=Date.now();
      }
    },err =>{
      alert('Problème de chargement');
      this.progre=0;
    })
    this.selectedFiles = null;
    this.onSelectCat(this.currenteCat);
    this.ediPhoto=false;
  }

  getTs() {
    return this.timestamp;
  }
  initialValuUpload(){
    this.progre=0;
    this.selectedFiles = null;
  }

  setvaluPromo() {
      this.formEditMenu.get('prixpromo')?.setValue(0);
  }
  getErrorMessage(nom: string, errors: ValidationErrors) {
    if (errors['required']){
      return nom +" ne peut pas être vide!";
    }else if (errors['min']){
      return nom +" devrait avoir une valeur min de "+errors['min'].min+", valeur actuel "+errors['min'].actual;
    }else if (errors['max']){
      return nom +" devrait avoir une valeur max de "+errors['max'].max+", valeur actuel "+errors['max'].actual;
    }else if (errors['minlength']){
      return nom +" devrait avoir une longueur min de "+errors['minlength'].requiredLength+", longuere actuel "+errors['minlength'].actualLength;
    }else if (errors['maxlength']){
      return nom +" devrait avoir une longueur max de "+errors['maxlength'].requiredLength+", longuere actuel "+errors['maxlength'].actualLength;
    }else if (errors['email']){
      return nom+" incorrecte!"
    }else{
      return "";
    }
  }
}


















