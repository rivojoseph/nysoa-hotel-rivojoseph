import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DlayoutComponent } from './dlayout/dlayout.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CallendarEventComponent } from './callendar-event/callendar-event.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { MessagesComponent } from './messages/messages.component';
import {CustomerItemComponent} from "./list-customer/customer-item/customer-item.component";
import {ReactiveFormsModule} from "@angular/forms";

import {FullCalendarModule} from '@fullcalendar/angular';
import { CustomerItem2Component } from './list-customer/customer-item2/customer-item2.component';
import { CustomerDetailComponent } from './list-customer/customer-detail/customer-detail.component';

@NgModule({
  declarations: [
    DlayoutComponent,
    ListCustomerComponent,
    DashboardComponent,
    CallendarEventComponent,
    CommandesComponent,
    ReservationsComponent,
    MessagesComponent,
    CustomerItemComponent,
    CustomerItem2Component,
    CustomerDetailComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ]
})
export class DashboardModule { }
