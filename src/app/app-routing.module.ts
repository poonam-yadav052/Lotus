import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UdbanktransactionComponent} from './pages/udbanktransaction/udbanktransaction.component';
import {UdbpcsComponent} from './pages/udbpcs/udbpcs.component';
import {UdsapComponent} from './pages/udsap/udsap.component';
import { UdvdataComponent } from './pages/udvdata/udvdata.component';
import { DuplicatepaymentComponent } from './pages/duplicatepayment/duplicatepayment.component';
import { PaymentadvicenoteComponent } from './pages/paymentadvicenote/paymentadvicenote.component';
import { PaymentreconsilationComponent } from './pages/paymentreconsilation/paymentreconsilation.component';
import {LoginComponent} from './login/login.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'banktransctions', component: UdbanktransactionComponent},
  { path: 'Udbpcs', component: UdbpcsComponent},
  {path: 'udsap', component: UdsapComponent},
  {path: 'udvdata', component: UdvdataComponent},
  {path:'duplicatepayment', component: DuplicatepaymentComponent},
  {path:'paymentadvicenote', component: PaymentadvicenoteComponent},
  {path: 'paymentreconsilation', component:PaymentreconsilationComponent},
	 {path: 'login', component: LoginComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, UdbanktransactionComponent, UdbpcsComponent, UdsapComponent, UdvdataComponent, DuplicatepaymentComponent, PaymentadvicenoteComponent, PaymentreconsilationComponent ]
