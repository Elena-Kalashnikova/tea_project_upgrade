import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "../main/main.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {CardComponent} from "./card/card.component";
import {OrderComponent} from "../order/order.component";

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'card/:id',
    component: CardComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

