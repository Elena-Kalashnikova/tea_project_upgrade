import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './views/products/app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {SharedModule} from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MainModule} from "./views/main/main.module";
import {ProductsModule} from "./views/products/products.module";
import {FormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SlickCarouselModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MainModule,
    ProductsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
