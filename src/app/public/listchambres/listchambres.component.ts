import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../_services/category.service";
import {CategoryChambre} from "../../_models/CategoryChambre.model";
import {Chambre} from "../../_models/Chambre.model";
import {ChambreService} from "../../_services/chambre.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {CalendarOptions} from "@fullcalendar/core";
import {Router} from "@angular/router";
import {CartService2} from "../../_services/cart2.service";
import {Cart2} from "../../_models/Cart2.model";


@Component({
  selector: 'app-listchambres',
  templateUrl: './listchambres.component.html',
  styleUrls: ['./listchambres.component.css']
})
export class ListchambresComponent implements OnInit {

  public catChambre!:CategoryChambre[] ;
  public listChambreByCat!:Chambre[];
  public errormesage!:string;
  public currentChambre!:Chambre;
  public currentCat!:CategoryChambre;
  public formReserve!:FormGroup;
  problemDate1: boolean=true;
  problemDate2: boolean=true;
  prixtotal!:number;
  deco!:number;
  sono!:number;
  valide!: boolean;
  formGroup1!:FormGroup;
  discout!: number;

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin
    ],
    initialView: 'dayGridMonth',
    editable: true, // important for activating event interactions!
    selectable: true, // important for activating date selectability!
    weekends: true,
    events: [
      {title: 'Meeting', start: new Date(), end: "2023-05-05"}
    ]
  };

  constructor(
    private catMenServ:CategoryService,
    private chambreService:ChambreService,
    private fb:FormBuilder,
    private router:Router,
    private cartService2:CartService2,
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getAllCatChambre();
    this.getAllChambre();
    this.initialForm();
  }


  initialForm(){
    this.formReserve = this.fb.group({
      id:this.fb.control(0),
      datedarrive:this.fb.control(null,[Validators.required]),
      datedepart:this.fb.control(null,[Validators.required]),
      nbrejour:this.fb.control(0,[Validators.required,Validators.min(1)]),
      nbadulte:this.fb.control(0,[Validators.required]),
      nbenfant:this.fb.control(0,[Validators.required]),
    });
    this.formGroup1 = new FormGroup({
      isdeco:new FormControl(),
      issono:new FormControl(),
    });
    this.problemDate1=true;
    this.problemDate2=true;
  }

  getAllChambre(){
    this.chambreService.getChambre().subscribe(
      value => {
        this.listChambreByCat=value;
      },error => {
        console.log(error);
        this.errormesage=error.message;
      }
    )
  }

  public getAllCatChambre(){
     this.catMenServ.getCategoryChambre().subscribe(
       value => {
         this.catChambre=value;
       },error => {
         console.log(error);
         this.errormesage=error;
       }
     )
  }

  getlistChambreByCat(catchambre:CategoryChambre){
    this.currentCat = catchambre;
    this.chambreService.getChambreByCategory(catchambre).subscribe(
      value => {
        this.listChambreByCat=value.content;
      },error => {
        console.log(error)
        this.errormesage = error.message;
      }
    )
  }

  getDetail(ch: Chambre) {
    this.chambreService.getOneChambre(ch.id).subscribe(
      value => {
        this.currentChambre = value;
        this.deco=value.prixdeco;
        this.sono=value.prixsono;
        this.prixtotal=value.prix;
        this.discout=value.prixpromo;
        console.log(value);
      },error => {
        console.log(error);
        this.errormesage = error.message;
      }
    );
  }

  onReetour() {
    this.router.navigateByUrl('/listchambres');
    this.initialForm();
  }

  checkDate1(){
    let nbj=0
    let dateAujourDuit:number=new Date().getTime()/86400000;
    let dateArriver:number=new Date(this.formReserve.get('datedarrive')?.value).getTime()/86400000;
    let datedepart:number =new Date(this.formReserve.get('datedepart')?.value).getTime()/86400000;
    if((dateAujourDuit-dateArriver)>1){
      this.problemDate1=true;
      let nbj=0;
      this.formReserve.get('nbrejour')?.setValue(nbj);
    }else {
      this.problemDate1=false;
      nbj=datedepart-dateArriver;
      this.formReserve.get('nbrejour')?.setValue(nbj);
    }
  }
  checkDate2(){
    let nbj=0
    let datedarrive:number =new Date(this.formReserve.get('datedarrive')?.value).getTime()/86400000;
    let datedepart:number =new Date(this.formReserve.get('datedepart')?.value).getTime()/86400000;
    console.log("popo "+(datedarrive-datedepart))
    if(datedarrive-datedepart>=0){
      this.problemDate2=true;
      let nbj=0;
      this.formReserve.get('nbrejour')?.setValue(nbj);
    }else {
      this.problemDate2=false;
      nbj=datedepart-datedarrive;
      this.formReserve.get('nbrejour')?.setValue(nbj);
    }

  }

  setReservation() {
    if (this.currentChambre){
      let nb =this.currentChambre.nombrePerson-(this.formReserve.get('nbadulte')?.value+this.formReserve.get('nbenfant')?.value);
      if (nb<0){
        this.valide=true;
      }else {
        this.valide=false;
        const cart:Cart2=new Cart2();
        cart.number=this.formReserve.get('nbrejour')?.value;
        cart.start=this.formReserve.get('datedarrive')?.value;
        cart.end=this.formReserve.get('datedepart')?.value;
        cart.chambre=this.currentChambre;
        cart.deco=this.deco;
        cart.sono=this.sono;
        cart.isdeco=this.formGroup1.get('isdeco')?.value;
        cart.issono=this.formGroup1.get('issono')?.value;
        cart.total=this.prixtotal;
        cart.discout=this.discout;
        cart.nbadulte=this.formReserve.get('nbadulte')?.value;
        cart.nbenfant=this.formReserve.get('nbenfant')?.value;
        this.cartService2.addChambreToCart(cart);
        this.initialForm();
        alert("Réservation ajouter!");
        this.router.navigateByUrl('/listchambres');
      }
    }
  }

  operationdeco() {
    if (this.formGroup1.get('isdeco')?.value){
      this.prixtotal=this.prixtotal+this.deco;
    }else {
      this.prixtotal=this.prixtotal-this.deco;
    }
  }
  operationsono() {
    if (this.formGroup1.get('issono')?.value){
      this.prixtotal=this.prixtotal+this.sono;
    }else {
      this.prixtotal=this.prixtotal-this.sono;
    }
  }
}
