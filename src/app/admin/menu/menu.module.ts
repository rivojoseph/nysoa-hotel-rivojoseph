import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MDeleteComponent } from './m-delete/m-delete.component';
import { MEditComponent } from './m-edit/m-edit.component';
import { MAddComponent } from './m-add/m-add.component';
import { MIndexComponent } from './m-index/m-index.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [

    MDeleteComponent,
       MEditComponent,
       MAddComponent,
       MIndexComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MenuModule { }
