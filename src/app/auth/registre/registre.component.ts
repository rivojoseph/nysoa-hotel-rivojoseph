import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {AppUser} from "../../_models/AppUser.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {

  public errormessage!:string;
  public formRegistre!:FormGroup;
  public newuser!:AppUser;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.initializationForm();
  }

  initializationForm(){
    this.formRegistre = this.fb.group({
      numerotelephone:this.fb.control('',[Validators.required,Validators.minLength(10),Validators.maxLength(13)]),
      email:this.fb.control('',[Validators.email]),
      username:this.fb.control('',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      password:this.fb.control('',[Validators.required,Validators.minLength(4)]),
      repassword:this.fb.control('',[Validators.required,Validators.minLength(4)]),
    })
  }


  getErrorMessage(nom: string,errors:ValidationErrors):String {

    if (errors['required']){
      return nom +" ne peut pas être vide!";
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

  keyup() {
    console.log("keyup")
  }

  onRegistry() {
    const appUser:AppUser = new AppUser();
    appUser.numerotelephone = this.formRegistre.get('numerotelephone')?.value;
    appUser.email = this.formRegistre.get('email')?.value;
    appUser.username = this.formRegistre.get('username')?.value;
    appUser.password = this.formRegistre.get('password')?.value;
    if ((this.formRegistre.get('password')?.value===this.formRegistre.get('repassword')?.value)){
      this.errormessage="";
      this.authService.singUp(appUser).subscribe(
        value => {
          this.newuser=value;
          this.authService.addRoleByCustomer(value).subscribe(
            value1 => {
              alert("Bienvenue "+value.username);
              this.router.navigate(['auth']);
            },error => {
              console.log(error);
            }
          );
        }, error => {
          console.log(error);
          this.errormessage = error.message;
        }
      )
    }else {
      this.errormessage = "les mots de passe ne correspond pas!";
    }
  }
}
