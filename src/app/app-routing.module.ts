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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  
  {path:'', component:ShellComponent,
  children:[
  {path: 'home', component: HomeComponent},
  {path: 'MemberList', component: MemberListComponent}
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
  FooterComponent,HeaderComponent,SidebarComponent,HomeComponent]
