import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DlayoutComponent} from "./dlayout/dlayout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ListCustomerComponent} from "./list-customer/list-customer.component";
import {CallendarEventComponent} from "./callendar-event/callendar-event.component";
import {MessagesComponent} from "./messages/messages.component";
import {ReservationsComponent} from "./reservations/reservations.component";
import {CommandesComponent} from "./commandes/commandes.component";
import {CustomerItemComponent} from "./list-customer/customer-item/customer-item.component";
import {CustomerItem2Component} from "./list-customer/customer-item2/customer-item2.component";
import {CustomerDetailComponent} from "./list-customer/customer-detail/customer-detail.component";

const routes: Routes = [
  {path:'',component:DlayoutComponent,children:[
      {path:'',component:DashboardComponent},
      {path:'listcustomers',component:ListCustomerComponent},
      {path:'calendar',component:CallendarEventComponent},
      {path:'commandes',component:CommandesComponent},
      {path:'reservations',component:ReservationsComponent},
      {path:'messages',component:MessagesComponent},
      {path:'listcommandesByUser/:id',component:CustomerItemComponent},
      {path:'listreservationsByUser/:id',component:CustomerItem2Component},
      {path:'customerdetail/:id',component:CustomerDetailComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
