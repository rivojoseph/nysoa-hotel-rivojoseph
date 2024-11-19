import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PanierComponent} from "./panier/panier.component";
import {ListproduitsComponent} from "./listproduits/listproduits.component";
import {ListmenusComponent} from "./listmenus/listmenus.component";
import {ListchambresComponent} from "./listchambres/listchambres.component";
import {ContactComponent} from "./contact/contact.component";
import {PlayoutComponent} from "./playout/playout.component";
import {CartComponent} from "./cart/cart.component";
import {DatedoccupationComponent} from "./datedoccupation/datedoccupation.component";
import {Cart2Component} from "./cart2/cart2.component";
import {MonespaceComponent} from "./monespace/monespace.component";
import {EcommandesComponent} from "./monespace/ecommandes/ecommandes.component";
import {EmessagesComponent} from "./monespace/emessages/emessages.component";
import {EreservationComponent} from "./monespace/ereservation/ereservation.component";
import {EevenementsComponent} from "./monespace/eevenements/eevenements.component";
import {EprofileComponent} from "./monespace/eprofile/eprofile.component";

const routes: Routes = [
  {path: "", component: PlayoutComponent, children: [

      {path: "", redirectTo: "home", pathMatch: "full"},
      {path: "home", component: HomeComponent},
      {path: "contact", component: ContactComponent},
      {path: "listproduits", component: ListproduitsComponent},
      {path: "listmenus", component: ListmenusComponent},
      {path: "listchambres", component: ListchambresComponent,children:[
          {path: "dateoccupation/:id", component: DatedoccupationComponent}
        ]},
      {path: "panier", component: CartComponent},
      {path: "panier2", component: Cart2Component},
      {path: "monespace", component: MonespaceComponent,children:[
          {path:"ecommandes",component: EcommandesComponent},
          {path:"eevenement",component: EevenementsComponent},
          {path:"ereservations",component: EreservationComponent},
          {path:"emessages",component: EmessagesComponent},
          {path:"eprofile",component: EprofileComponent},
        ]},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
