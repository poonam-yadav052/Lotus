import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string;
  userdata:any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.userdata=JSON.parse(localStorage.getItem('userdetails'));
    this.username=this.userdata["userName"];
   
    
  }

  signout(){
    localStorage.setItem('userdetails',"")
    this.router.navigate(['']);
  }

}
