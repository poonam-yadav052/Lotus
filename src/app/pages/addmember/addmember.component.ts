import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/upload-file.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  registered = false;
  submitted = false;
  userprefix;
	userForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private service:UploadFileService,private spinner:NgxSpinnerService) { }

  userName1 = "";
  userName2 = "";
 

  ngOnInit()
  {
    this.userForm = this.formBuilder.group({
  		userName1: ['', Validators.required],
      userName2: ['', [Validators.required]],
  		loginName: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      creditLimit: ['', Validators.required],
      repeatPassword:['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      agentPosition: ['', Validators.required],
      notes: ['', Validators.required],
      status: ['', Validators.required],

      
    });
    this.spinner.show();
    this.service.getmaxuser().subscribe(
      data=>{
        console.log(data)
        data=data.result
    console.log("user Max data result=="+JSON.stringify(data[0].userName));
    var username = data[0].userName;
    var a = username.split('-');
    this.userprefix=a[0];   
    this.userName1 = a[1];
    this.userName2 = a[1];
    this.spinner.hide();
      },
      error=>{
        this.spinner.hide();
      })
  	
  }

  onSubmit()
  {
    console.log("IN");
    this.submitted = true;
    let data: any = Object.assign(this.userForm.value);
    console.log("IN"+JSON.stringify(data));
    this.spinner.show();
    this.service.addmember(JSON.stringify(data)).subscribe(
    data=>{
      this.spinner.hide();
    console.log(data);
    let path = '/usersDisplay';
    this.router.navigate([path]);
    this.registered = true;
    },
    error=>{
    console.log(error)
    this.spinner.hide();
    }

    )
    this.registered = true;   
  }

}


