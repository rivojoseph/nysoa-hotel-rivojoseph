import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MIndexComponent} from "./m-index/m-index.component";
import {MAddComponent} from "./m-add/m-add.component";
import {MEditComponent} from "./m-edit/m-edit.component";
import {MDeleteComponent} from "./m-delete/m-delete.component";

const routes: Routes = [
  {path:'', redirectTo:'mindex', pathMatch:'full'},
  {path:'mindex', component: MIndexComponent},
  {path:'madd', component: MAddComponent},
  {path:'medit/:id',component: MEditComponent},
  {path:'mdelete', component: MDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
