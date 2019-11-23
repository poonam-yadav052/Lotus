import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ShellComponent } from './shell/shell.component';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import { MemberListComponent } from './pages/member-list/member-list.component';
import { AddmemberComponent } from './pages/addmember/addmember.component';
import { UserdisplayComponent } from './pages/userdisplay/userdisplay.component';
import { PositionTakingComponent } from './pages/position-taking/position-taking.component';
import {UserlistComponent} from './pages/userlist/userlist.component';
import {AdduserComponent} from './pages/adduser/adduser.component';
import {MemberdetailsComponent} from './pages/memberdetails/memberdetails.component';
import { BalanceComponent } from './pages/balance/balance.component';
import { BettickerComponent } from './pages/betticker/betticker.component';
import { NetexposureComponent } from './pages/netexposure/netexposure.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { AccountstatementComponent } from './pages/accountstatement/accountstatement.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  
  {path:'', component:ShellComponent,
  children:[
  {path: 'home', component: HomeComponent},
  {path: 'MemberList', component: MemberListComponent},
  {path: 'addmember', component: AddmemberComponent},
  {path:'usersDisplay', component: UserdisplayComponent},
  {path:'positionTaking', component: PositionTakingComponent},
  {path:'userlist', component: UserlistComponent},
  {path:'adduser', component: AdduserComponent},
  {path:'memberdetails', component: MemberdetailsComponent},
  {path:'accountbalance', component: BalanceComponent},
  {path:'betticker', component: BettickerComponent},
  {path:'transfer', component: TransferComponent},
  {path:'netexlosure', component: NetexposureComponent},
  {path:'accountstatement', component: AccountstatementComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule,MatButtonModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, 
  MemberListComponent,
  FooterComponent,HeaderComponent,SidebarComponent,HomeComponent,PositionTakingComponent,UserlistComponent,AdduserComponent]
