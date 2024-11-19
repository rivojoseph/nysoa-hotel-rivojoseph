import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UIndexComponent } from './u-index/u-index.component';
import { UEditComponent } from './u-edit/u-edit.component';
import { UDeleteComponent } from './u-delete/u-delete.component';
import { UAddComponent } from './u-add/u-add.component';


@NgModule({
  declarations: [
    UIndexComponent,
    UEditComponent,
    UDeleteComponent,
    UAddComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
