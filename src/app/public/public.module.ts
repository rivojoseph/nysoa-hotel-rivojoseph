import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PmenuComponent } from './pmenu/pmenu.component';
import { PlayoutComponent } from './playout/playout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ListchambresComponent } from './listchambres/listchambres.component';
import { ListmenusComponent } from './listmenus/listmenus.component';
import { ListproduitsComponent } from './listproduits/listproduits.component';
import { PanierComponent } from './panier/panier.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AboutComponent } from './home/about/about.component';
import { ServiceComponent } from './home/service/service.component';
import { TeamsComponent } from './home/teams/teams.component';
import {TestimonialComponent} from "./home/testimonial/testimonial.component";
import { FooterComponent } from './home/footer/footer.component';
import { SliderchambreComponent } from './home/sliderchambre/sliderchambre.component';
import { PrevDirective } from './_directives/prev.directive';
import {NextDirective} from "./_directives/next.directive";
import { SlidermenuComponent } from './home/slidermenu/slidermenu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CaddiesComponent } from './caddies/caddies.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { DatedoccupationComponent } from './datedoccupation/datedoccupation.component';
import { Cart2Component } from './cart2/cart2.component';
import { MonespaceComponent } from './monespace/monespace.component';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EcommandesComponent } from './monespace/ecommandes/ecommandes.component';
import { EreservationComponent } from './monespace/ereservation/ereservation.component';
import { EevenementsComponent } from './monespace/eevenements/eevenements.component';
import { EmessagesComponent } from './monespace/emessages/emessages.component';
import { EprofileComponent } from './monespace/eprofile/eprofile.component';

FullCalendarModule.bind([
  interactionPlugin,
  dayGridPlugin,
])

@NgModule({
  declarations: [
    PmenuComponent,
    PlayoutComponent,
    HomeComponent,
    ContactComponent,
    ListchambresComponent,
    ListmenusComponent,
    ListproduitsComponent,
    PanierComponent,
    CarouselComponent,
    AboutComponent,
    ServiceComponent,
    TeamsComponent,
    TestimonialComponent,
    FooterComponent,
    SliderchambreComponent,
    NextDirective,
    PrevDirective,
    SlidermenuComponent,
    CaddiesComponent,
    CartComponent,
    ProfileComponent,
    DatedoccupationComponent,
    Cart2Component,
    MonespaceComponent,
    EcommandesComponent,
    EreservationComponent,
    EevenementsComponent,
    EmessagesComponent,
    EprofileComponent
  ],
    exports: [
        CarouselComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        ReactiveFormsModule,
        FullCalendarModule,
        FormsModule,
        DatePipe,
    ]
})
export class PublicModule { }
