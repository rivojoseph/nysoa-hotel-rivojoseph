import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../_services/category.service";
import {ChambreService} from "../../../_services/chambre.service";
import {CategoryChambre} from "../../../_models/CategoryChambre.model";
import {Chambre} from "../../../_models/Chambre.model";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import * as http from "http";

@Component({
  selector: 'app-c-index',
  templateUrl: './c-index.component.html',
  styleUrls: ['./c-index.component.css']
})
export class CIndexComponent implements OnInit {
  public listCategory!:CategoryChambre[];
  public currenteCategory!:CategoryChambre;
  public listChambre!:any;
  public currentechambre!:Chambre;
  public totalChambre:number=0;
  errormesage!: string;
  public timestamp: any;
  public ediPhoto!: boolean;
  public selectedFiles!: undefined;
  public progre!: number;
  public currentFileUpload!: File;
  public formChambre!:FormGroup;
  constructor(
    private catChamService:CategoryService,
    public chambreSevice:ChambreService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.initializeFormgroup();
    this.getListCatChambre();
  }

  public  getListCatChambre(){
    this.catChamService.getCategoryChambre().subscribe(
      value => {
        this.listCategory=value;
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    )
  }

  onSelectCat(c: CategoryChambre) {
    this.currenteCategory=c;
    this.chambreSevice.getChambreByCategory(c).subscribe(
      value => {
        this.listChambre=value.content;
        console.log(this.listChambre)
        this.totalChambre=value.totalElements;
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    );
  }

  getAllListChambre(){
    this.chambreSevice.getChambre().subscribe(
      value => {
        this.listChambre=value;
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    )
  }

  getTs() {
    return this.timestamp;
  }


  getphotoChambre(c: Chambre) {
    this.currentechambre=c;
    this.progre=0;
  }

  onHandleModifDisponible(c: Chambre) {
    let d = !c.disponible;
    this.chambreSevice.modifDisponible(c.id,d).subscribe(
      value => {
        this.onSelectCat(this.currenteCategory);
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    );
  }

  onHandleDelete(c: Chambre) {
    let conf = confirm("Vous-éte sûre de vouloire effacer la chambre :"+c.numeroChambre+"?")
    if (conf!=true) return;
    this.chambreSevice.deleteChambre(c).subscribe(
      value => {
        alert("Suppression avec succé!")
        this.onSelectCat(this.currenteCategory);
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    );
  }

  initializeFormgroup() {
     this.formChambre = this.fb.group({
       id:this.fb.control(0),
       numeroChambre:this.fb.control(0,[Validators.required, Validators.min(1), Validators.max(50)]),
       detailChambre:this.fb.control("",[Validators.required, Validators.minLength(20), Validators.maxLength(200)]),
       sonorisation:this.fb.control(false),
       prixsono:this.fb.control(0,[Validators.min(0),Validators.max(800000)]),
       decoration:this.fb.control(false),
       prixdeco:this.fb.control(0,[Validators.min(0),Validators.max(800000)]),
       prix:this.fb.control(0,[Validators.required, Validators.min(20000), Validators.max(1000000)]),
       nombrePerson:this.fb.control(0,[Validators.min(0),Validators.max(300)]),
       promo:this.fb.control(false),
       prixpromo:this.fb.control(0,[Validators.min(0),Validators.max(99)]),
       tv:this.fb.control(false),
       wifi:this.fb.control(false),
       eauChaude:this.fb.control(false),
       climatiseur:this.fb.control(false),
       nombrelit:this.fb.control(0,[Validators.min(0),Validators.max(6)]),
     })
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
    this.chambreSevice.uploadPhotoVoiture(this.currentFileUpload,this.currentechambre.id).subscribe(event=>{
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
    this.selectedFiles = undefined;
    this.onSelectCat(this.currenteCategory);
    this.ediPhoto=false;
  }


  onHandleAddChambre() {
    const chambre = new Chambre();
    if (this.formChambre.invalid) return;
    if(this.formChambre.get('nombrelit')?.value==0){
      chambre.numeroChambre=this.formChambre.get('numeroChambre')?.value;
      chambre.detailChambre=this.formChambre.get('detailChambre')?.value;
      chambre.sonorisation=this.formChambre.get('sonorisation')?.value;
      chambre.prixsono=this.formChambre.get('prixsono')?.value;
      chambre.decoration=this.formChambre.get('decoration')?.value;
      chambre.prixdeco=this.formChambre.get('prixdeco')?.value;
      chambre.prix=this.formChambre.get('prix')?.value;
      chambre.promo=this.formChambre.get('promo')?.value;
      chambre.prixpromo=this.formChambre.get('prixpromo')?.value;
      chambre.nombrePerson=this.formChambre.get('nombrePerson')?.value;
      chambre.categoryChambre=this.currenteCategory;
    }else {
      chambre.numeroChambre=this.formChambre.get('numeroChambre')?.value;
      chambre.detailChambre=this.formChambre.get('detailChambre')?.value;
      chambre.prix=this.formChambre.get('prix')?.value;
      chambre.promo=this.formChambre.get('promo')?.value;
      chambre.prixpromo=this.formChambre.get('prixpromo')?.value;
      chambre.nombrePerson=this.formChambre.get('nombrePerson')?.value;
      chambre.nombrelit=this.formChambre.get('nombrelit')?.value;
      chambre.tv=this.formChambre.get('tv')?.value;
      chambre.wifi=this.formChambre.get('wifi')?.value;
      chambre.eauChaude=this.formChambre.get('eauChaude')?.value;
      chambre.climatiseur=this.formChambre.get('climatiseur')?.value;
      chambre.categoryChambre=this.currenteCategory;
    }
    if (this.formChambre.get('id')?.value==0){
      this.chambreSevice.addChambre(chambre).subscribe(
        value => {
          alert("Chambre ajouter avec succée!");
          console.log(chambre);
          this.currentechambre = value;
          this.onSelectCat(this.currentechambre.categoryChambre);
          this.initializeFormgroup();
        }, error => {
          console.log(error);
          console.log(chambre);
          this.errormesage = error;
        });
    }else {
      this.chambreSevice.editChambre(this.formChambre.get('id')?.value,chambre).subscribe(
        value => {
          alert("Chambre Modifier avec succée!");
          console.log(chambre);
          this.currentechambre = value;
          this.onSelectCat(this.currentechambre.categoryChambre);
          this.initializeFormgroup();
        }, error => {
          console.log(error);
          console.log(chambre);
          this.errormesage = error;
        });
    }

  }

  onHandleEdit(c: any) {
    this.currentechambre=c;
    this.formChambre = this.fb.group({
      id:this.fb.control(this.currentechambre.id),
      numeroChambre:this.fb.control(this.currentechambre.numeroChambre,[Validators.required, Validators.min(1), Validators.max(50)]),
      detailChambre:this.fb.control(this.currentechambre.detailChambre,[Validators.required, Validators.minLength(20), Validators.maxLength(200)]),
      sonorisation:this.fb.control(this.currentechambre.sonorisation),
      prixsono:this.fb.control(this.currentechambre.prixsono),
      decoration:this.fb.control(this.currentechambre.decoration),
      prixdeco:this.fb.control(this.currentechambre.prixdeco),
      prix:this.fb.control(this.currentechambre.prix,[Validators.required, Validators.min(20000), Validators.max(1000000)]),
      nombrePerson:this.fb.control(this.currentechambre.nombrePerson),
      promo:this.fb.control(this.currentechambre.promo),
      prixpromo:this.fb.control(this.currentechambre.prixpromo),
      tv:this.fb.control(this.currentechambre.tv),
      wifi:this.fb.control(this.currentechambre.wifi),
      eauChaude:this.fb.control(this.currentechambre.eauChaude),
      climatiseur:this.fb.control(this.currentechambre.climatiseur),
      nombrelit:this.fb.control(this.currentechambre.nombrelit),
    });
  }

  setValuDeco() {
    this.formChambre.get('prixdeco')?.setValue(0);
  }
  setValuSono() {
    this.formChambre.get('prixsono')?.setValue(0);
  }
  setValuPromo() {
    this.formChambre.get('prixpromo')?.setValue(0);
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
