import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DuplicatepaymentComponent } from './pages/duplicatepayment/duplicatepayment.component';
import { PaymentadvicenoteComponent } from './pages/paymentadvicenote/paymentadvicenote.component';
import { PaymentreconsilationComponent } from './pages/paymentreconsilation/paymentreconsilation.component';
import { LoginComponent } from './login/login.component';
//import { PaymentreconsilationComponent } from './pages/paymentreconsilation/paymentreconsilation.component';
//import { PaymentreconsilationComponent } from './pages/paymentreconsilation/paymentreconsilation.component';
//import { PaymentreconsilationComponent } from './pages/paymentreconsilation/paymentreconsilation.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DuplicatepaymentComponent,
    PaymentadvicenoteComponent,
    PaymentreconsilationComponent,
	LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
