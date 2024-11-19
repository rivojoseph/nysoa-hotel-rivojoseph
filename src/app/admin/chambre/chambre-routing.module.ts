import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CIndexComponent} from "./c-index/c-index.component";
import {CAddComponent} from "./c-add/c-add.component";
import {CEditComponent} from "./c-edit/c-edit.component";
import {CDeleteComponent} from "./c-delete/c-delete.component";

const routes: Routes = [
  {path:'', redirectTo:'cindex', pathMatch:'full'},
  {path:'cindex', component: CIndexComponent},
  {path:'cadd', component: CAddComponent},
  {path:'cedit',component: CEditComponent},
  {path:'cdelete', component: CDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChambreRoutingModule { }
