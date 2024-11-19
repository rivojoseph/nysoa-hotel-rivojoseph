import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChambreRoutingModule } from './chambre-routing.module';
import { CIndexComponent } from './c-index/c-index.component';
import { CEditComponent } from './c-edit/c-edit.component';
import { CDeleteComponent } from './c-delete/c-delete.component';
import { CAddComponent } from './c-add/c-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    CIndexComponent,
    CEditComponent,
    CDeleteComponent,
    CAddComponent
  ],
  imports: [
    CommonModule,
    ChambreRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ChambreModule { }
