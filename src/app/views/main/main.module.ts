import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from "./main.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {NgbAccordionModule} from "@ng-bootstrap/ng-bootstrap";
import {OrderModule} from "../order/order.module";



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    NgbAccordionModule,
    SharedModule,
    RouterModule,
    MainRoutingModule,
    OrderModule
  ]
})
export class MainModule {
}
