import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadFileService } from '../upload-file.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted=false;
  loginresult:string;
  userid:string='';
  constructor(private formbuilder:FormBuilder,private spinner:NgxSpinnerService,
    private fileuploadservice:UploadFileService,private router:Router) { 
    this.loginForm = this.formbuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit() {
      let usertoken=localStorage.getItem('usertoken');
      this.userid=usertoken;
      console.log(this.userid);
      if(this.userid != "")
      {
        this.router.navigate(['../home/']);
      }
      else{
        localStorage.setItem('usertoken',"");
      }
    
  }

  get f() {return this.loginForm.controls}

  onSubmit(customerData) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.spinner.show();
    // Process checkout data here
    
    this.fileuploadservice.chklogin(this.f.username.value,this.f.password.value).subscribe(
      data=>{
        console.log("Success")
        console.log(data)
        this.spinner.hide();
        if(data == "Login Successfull")
        {
          
          localStorage.clear();
          localStorage.setItem('usertoken',"true");
          localStorage.setItem('username',this.f.username.value);
          this.router.navigate(['../home/']);
          this.loginForm.reset();
        }      
        else{
          this.loginresult="Login Failed";
        }
        
      },
      error=>{
        this.spinner.hide();
        console.log("Login Failed")
        console.log(error)
        this.loginresult="Login Failed";
      })
    
  }

}
