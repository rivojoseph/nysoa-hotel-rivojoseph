import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlayoutComponent} from "./alayout/alayout.component";

const routes: Routes = [
  {path:'',component:AlayoutComponent,children:[

      {path:'', redirectTo:'dashboard', pathMatch:"full"},
      {path:'dashboard', loadChildren:() => import('./dashboard/dashboard.module').then(value => value.DashboardModule)},
      {path:'user', loadChildren:() => import('./user/user.module').then(value => value.UserModule)},
      {path:'produit', loadChildren:() => import('./produit/produit.module').then(value => value.ProduitModule)},
      {path:'menu', loadChildren:() => import('./menu/menu.module').then(value => value.MenuModule)},
      {path:'chambre', loadChildren:() => import('./chambre/chambre.module').then(value => value.ChambreModule)},

    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
