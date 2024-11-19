import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {UserModel} from "../../_models/user.model";
import {TokensModel} from "../../_models/tokens.model";
import {TokenService} from "../../_services/token.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin!:FormGroup;
  public errormessage:string= "";
  public token!:TokensModel;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private tokenService:TokenService,
  ) { }

  ngOnInit(): void {
    this.initializationForm();
  }

  initializationForm(){
    this.formLogin =this.fb.group({
      username:this.fb.control("",[Validators.required,Validators.minLength(4)]),
      password:this.fb.control("",[Validators.required,Validators.minLength(4)])
    })
  }

  onLogin() {
    const user:UserModel = new UserModel()
    user.username = this.formLogin.get('username')?.value;
    user.password = this.formLogin.get('password')?.value;
    this.authService.getAuth(user).subscribe(
      value => {
        this.token=value;
        this.tokenService.saveToken(this.token);
      },(error:HttpErrorResponse) => {
        if (error.status==403){
          this.errormessage="le nom d'utilisateur ou le mot de passe est incorrecte"
        }else
        this.errormessage=error.message;
      }
    )
  }

  getErrorMessage(nom: string, errors: ValidationErrors) {
    if (errors['required']){
      return nom +" ne peut pas être vide!";
    }else
      return "";
  }
}
