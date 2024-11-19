import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UIndexComponent} from "./u-index/u-index.component";
import {UAddComponent} from "./u-add/u-add.component";
import {UEditComponent} from "./u-edit/u-edit.component";
import {UDeleteComponent} from "./u-delete/u-delete.component";

const routes: Routes = [
  {path:'', redirectTo:'uindex', pathMatch:'full'},
  {path:'uindex', component: UIndexComponent},
  {path:'uadd', component: UAddComponent},
  {path:'uedit',component: UEditComponent},
  {path:'udelete', component: UDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
