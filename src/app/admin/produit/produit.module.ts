import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { PIndexComponent } from './p-index/p-index.component';
import { PAddComponent } from './p-add/p-add.component';
import { PEditComponent } from './p-edit/p-edit.component';
import { PDeleteComponent } from './p-delete/p-delete.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PIndexComponent,
    PAddComponent,
    PEditComponent,
    PDeleteComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProduitModule { }
