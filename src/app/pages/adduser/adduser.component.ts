import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/upload-file.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  registered = false;
  submitted = false;
  userprefix;
  userForm: FormGroup;
  userdata:any;
  creditlimit:number
  userrole:number;
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private service:UploadFileService,private spinner:NgxSpinnerService) { }

  ngOnInit() {

    this.userdata=JSON.parse(localStorage.getItem('userdetails'));
    this.creditlimit=this.userdata["creditLimit"]
    this.userrole=this.userdata["userRole"]
    this.userForm = this.formBuilder.group({
  		username: ['', Validators.required],
      status: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      repeatPassword:['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],

      
    });
  }

}
