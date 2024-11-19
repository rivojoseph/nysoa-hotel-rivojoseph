import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {PagenotfoundComponent} from "./_utils/pagenotfound/pagenotfound.component";
import {AuthGuard} from "./_helper/auth.guard";

const routes: Routes = [
  {path:"", loadChildren:() => import('./public/public.module').then(value => value.PublicModule)},
  {path:'admin', loadChildren:() => import('./admin/admin.module').then(value => value.AdminModule),canActivate:[AuthGuard]},
  {path:'auth', loadChildren:() => import('./auth/auth.module').then(value => value.AuthModule)},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
