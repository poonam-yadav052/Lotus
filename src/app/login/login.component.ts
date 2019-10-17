import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,FormControl,Validators,Validator } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted = false;
  result:any;
  constructor(private formBuilder: FormBuilder,
    private service:UploadFileService,
    private spinner:NgxSpinnerService,
    private modalservice: BsModalService,private router:Router) { 
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit() {
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
    
    this.service.Login(this.f.username.value,this.f.password.value).subscribe(
      data=>{
        console.log("Success")
        console.log(data)
        this.spinner.hide();      
          this.result=data;  
          localStorage.clear();
          localStorage.setItem('usertoken',"true");
          this.router.navigate(['../plots/'+data['token']+'']);      
      },
      error=>{
        this.spinner.hide();
        console.log("Error")
        console.log(error)
        this.result=error.error.Error;
      })
    
  }

}
