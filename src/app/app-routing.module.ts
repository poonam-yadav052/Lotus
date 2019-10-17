import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { UdvdataComponent } from './pages/udvdata/udvdata.component';
import { DuplicatepaymentComponent } from './pages/duplicatepayment/duplicatepayment.component';
import { PaymentadvicenoteComponent } from './pages/paymentadvicenote/paymentadvicenote.component';
import { PaymentreconsilationComponent } from './pages/paymentreconsilation/paymentreconsilation.component';
<<<<<<< HEAD
import { ViewhistoryComponent } from './pages/viewhistory/viewhistory.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ShellComponent } from './shell/shell.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  
  {path:'', component:ShellComponent,
  children:[
=======
import {LoginComponent} from './login/login.component';
import { ViewhistoryComponent } from './pages/viewhistory/viewhistory.component';



const routes: Routes = [
>>>>>>> 851ba70e3f3c716730e32e1c54b5e856e700d73a
  {path: 'home', component: HomeComponent},
  {path: 'udvdata', component: UdvdataComponent},
  {path:'duplicatepayment', component: DuplicatepaymentComponent},
  {path:'paymentadvicenote', component: PaymentadvicenoteComponent},
  {path: 'paymentreconsilation', component:PaymentreconsilationComponent},
<<<<<<< HEAD
  {path: 'viewhistory', component: ViewhistoryComponent},
  ]
}
=======
	 {path: 'login', component: LoginComponent},
   {path: 'viewhistory', component: ViewhistoryComponent},
   {path: '', component: LoginComponent},

>>>>>>> 851ba70e3f3c716730e32e1c54b5e856e700d73a
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
<<<<<<< HEAD
export const routingComponents = [LoginComponent, HeaderComponent,FooterComponent,SidebarComponent,ShellComponent, HomeComponent, UdvdataComponent, DuplicatepaymentComponent, PaymentadvicenoteComponent, PaymentreconsilationComponent,ViewhistoryComponent ]
=======
export const routingComponents = [HomeComponent, UdvdataComponent, DuplicatepaymentComponent, PaymentadvicenoteComponent, PaymentreconsilationComponent,ViewhistoryComponent ]
>>>>>>> 851ba70e3f3c716730e32e1c54b5e856e700d73a
