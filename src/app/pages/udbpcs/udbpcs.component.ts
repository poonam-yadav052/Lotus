import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-udbpcs',
  templateUrl: './udbpcs.component.html',
  styleUrls: ['./udbpcs.component.css']
})
export class UdbpcsComponent implements OnInit {

  progressFlag = true;
  constructor(private Router: Router,public http : HttpClient) { }

  ngOnInit() {
  }
  
  uploadbpcsdata(){
    alert('okay');
    this.Router.navigate(['/uploadbpcs']);
    this.progressFlag = false;
    this.http.get<any>('/uploadbpcs')
    .subscribe(data => {
     
      this.progressFlag = true;
    })
  }
}
