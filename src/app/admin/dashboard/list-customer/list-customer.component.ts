import {Component, Input, OnInit} from '@angular/core';
import {count, Observable} from "rxjs";
import {AppUser} from "../../../_models/AppUser.model";
import {RolesService} from "../../../_services/roles.service";
import {CustomersService} from "../../../_services/customers.service";
import {RoleModel} from "../../../_models/Role.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AstValue} from "@angular/compiler-cli/linker/src/ast/ast_value";
import {CartService} from "../../../_services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../_services/auth.service";
import {TokenService} from "../../../_services/token.service";
import {Commande} from "../../../_models/Commande.model";
import {CartService2} from "../../../_services/cart2.service";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  @Input() public AppUserInput$: Observable<AppUser> |null=null; /* par convention on met $ à la fin du variable si observable*/
  //gestion des pages Customers
  public data?:any;
  public appUsers!:AppUser[];
  public commandes!:Commande[];
  numberOfElements!: number;
  totalElements!: number;
  totalPages?:number;
  pages?:Array<any>;
  public currentePage: number=0;
  private size: number=10;
  //////////////////////////
  public roles!:RoleModel[];
  public currenteRole!:RoleModel;
  public erreurMessage!:string;
  public formParametre!:FormGroup;
  counts?: any;
  counts2?: any;

  constructor(
    private roleService:RolesService,
    private fb:FormBuilder,
    public cartService:CartService,
    public cartService2:CartService2,
    private router:Router,
    public auth:TokenService,
  ) {

  }

  ngOnInit(): void {
    this.getRoles();
    this.initialForm();
    if (this.currenteRole){
      this.onSelectRole(this.currenteRole);
    }
  }

  initialForm(){
    this.formParametre = this.fb.group({
      size:this.fb.control(10)
    })
  }
  getRoles(){
    this.roleService.getAllRolles().subscribe(
      value => {
        this.roles=value;
      },error => {
        console.log(error);
        this.erreurMessage=error.message;
      }
    )
  }

  onSelectRole(r: RoleModel) {
    this.currenteRole = r;
    this.size = this.formParametre.get('size')?.value;
    this.roleService.getAllUsersByRole(r, this.currentePage, this.size).subscribe(
      value => {
        this.appUsers=value.content;
        console.log(this.appUsers)
        this.totalPages=value.totalPages;
        this.pages=Array<any>(value.totalPages);
        this.totalElements=value.totalElements;
        this.numberOfElements=value.numberOfElements;
      }, error => {
        console.log(error);
        this.erreurMessage = error.message;
      });
  }

  onPage(i: number) {
    this.currentePage =i;
    this.onSelectRole(this.currenteRole);
  }
  onPrev(){
    this.currentePage--;
    this.onSelectRole(this.currenteRole);
  }
  onNext(){
    this.currentePage++;
    this.onSelectRole(this.currenteRole);
  }

  onGetBlocker(id: number) {

  }

  onGetCommande(appUser: AppUser) {
      this.router.navigateByUrl('/dashboard/listcommandesByUser/2');
  }


  getCount(u: AppUser) {
    this.cartService.countCommandeByCustomer(u).subscribe(
      value => {
        this.counts=value;
        if (this.counts!=0){
          this.router.navigateByUrl("/admin/dashboard/listcommandesByUser/"+u.id);
        }else {
          this.counts=0;
        }
      },error => {
        console.log(error)
      }
    );

  }

  getCount2(u: AppUser) {
    this.cartService2.getReservationbyCustomer(u.id,0,100).subscribe(
      value => {
        this.counts2=value.content.length;
        if (this.counts2!=0){
          this.router.navigateByUrl("/admin/dashboard/listreservationsByUser/"+u.id);
        }else {
          this.counts2=0;
        }
      },error => {
        console.log(error)
      }
    );
  }

  getDetail(u: AppUser) {
    this.router.navigateByUrl("/admin/dashboard/customerdetail/"+u.id);
  }
}
