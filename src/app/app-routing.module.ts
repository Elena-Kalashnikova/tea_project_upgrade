import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {
    path:'',
    children: [
      {path: '', loadChildren:() => import('./views/main/main.module').then(m => m.MainModule)},
      {path: 'products', loadChildren:() => import('./views/products/products.module').then(m => m.ProductsModule)},
      {path: 'order', loadChildren:() => import('./views/order/order.module').then(m => m.OrderModule)},
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
