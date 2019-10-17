import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentreconsilationComponent } from './pages/paymentreconsilation/paymentreconsilation.component';
=======

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DuplicatepaymentComponent } from './pages/duplicatepayment/duplicatepayment.component';
import { PaymentadvicenoteComponent } from './pages/paymentadvicenote/paymentadvicenote.component';
import { PaymentreconsilationComponent } from './pages/paymentreconsilation/paymentreconsilation.component';
import { LoginComponent } from './login/login.component';
>>>>>>> 851ba70e3f3c716730e32e1c54b5e856e700d73a
import { FormsModule ,FormBuilder,FormGroup,ReactiveFormsModule,FormControl  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BsDatepickerModule,BsModalRef,ModalModule,CarouselModule} from 'ngx-bootstrap';
import { UploadFileService } from './upload-file.service';
import {NgxPaginationModule} from 'ngx-pagination';
<<<<<<< HEAD
import { ShellComponent } from './shell/shell.component';
import { MatButtonModule } from '@angular/material/button';
=======
import { ViewhistoryComponent } from './pages/viewhistory/viewhistory.component';
>>>>>>> 851ba70e3f3c716730e32e1c54b5e856e700d73a
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
<<<<<<< HEAD
    PaymentreconsilationComponent,
    ShellComponent
=======
    DuplicatepaymentComponent,
    PaymentadvicenoteComponent,
    PaymentreconsilationComponent,
	LoginComponent,
	ViewhistoryComponent
>>>>>>> 851ba70e3f3c716730e32e1c54b5e856e700d73a
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
<<<<<<< HEAD
    NgxSpinnerModule, NgxPaginationModule,MatButtonModule
=======
    NgxSpinnerModule, NgxPaginationModule
>>>>>>> 851ba70e3f3c716730e32e1c54b5e856e700d73a
  ],
  providers: [UploadFileService,BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
