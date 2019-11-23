import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule ,FormBuilder,FormGroup,ReactiveFormsModule,FormControl  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BsDatepickerModule,BsModalRef,ModalModule,CarouselModule} from 'ngx-bootstrap';
import { UploadFileService } from './upload-file.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ShellComponent } from './shell/shell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MemberListComponent } from './pages/member-list/member-list.component';
import { AddmemberComponent } from './pages/addmember/addmember.component';
import { UserdisplayComponent } from './pages/userdisplay/userdisplay.component';
import { PositionTakingComponent } from './pages/position-taking/position-taking.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { PageheaderComponent } from './pages/pageheader/pageheader.component';
import { MemberdetailsComponent } from './pages/memberdetails/memberdetails.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { NetexposureComponent } from './pages/netexposure/netexposure.component';
import { BettickerComponent } from './pages/betticker/betticker.component';
import { AccountstatementComponent } from './pages/accountstatement/accountstatement.component';
import { BalanceComponent } from './pages/balance/balance.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ShellComponent,
    MemberListComponent,
    AddmemberComponent,
    UserdisplayComponent,
    PositionTakingComponent,
    UserlistComponent,
    AdduserComponent,
    PageheaderComponent,
    MemberdetailsComponent,
    TransferComponent,
    NetexposureComponent,
    BettickerComponent,
    AccountstatementComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule, NgxPaginationModule,Ng2SearchPipeModule, BrowserAnimationsModule
  ],
  providers: [UploadFileService,BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
