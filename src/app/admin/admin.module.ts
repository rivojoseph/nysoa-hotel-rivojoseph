import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AlayoutComponent } from './alayout/alayout.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AmenuComponent } from './amenu/amenu.component';
import { ParametreComponent } from './parametre/parametre.component';




@NgModule({
  declarations: [
    AlayoutComponent,
    AmenuComponent,
    ParametreComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
})
export class AdminModule { }
