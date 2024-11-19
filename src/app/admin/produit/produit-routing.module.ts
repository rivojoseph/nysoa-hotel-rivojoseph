import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PIndexComponent} from "./p-index/p-index.component";
import {PEditComponent} from "./p-edit/p-edit.component";
import {PAddComponent} from "./p-add/p-add.component";
import {PDeleteComponent} from "./p-delete/p-delete.component";

const routes: Routes = [
  {path:'', redirectTo:'pindex', pathMatch:'full'},
  {path:'pindex', component: PIndexComponent},
  {path:'padd', component: PAddComponent},
  {path:'pedit',component: PEditComponent},
  {path:'pdelete', component: PDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
