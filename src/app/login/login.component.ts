import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators, Validator } from '@angular/forms';
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
  loginForm: FormGroup;
  submitted = false;
  result: any;
  userdata: any;
  userrole: any;
  constructor(private formBuilder: FormBuilder,
    private service: UploadFileService,
    private spinner: NgxSpinnerService,
    private modalservice: BsModalService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['Test123', [Validators.required]],
      password: ['Test123', [Validators.required]]
    });
  }

  ngOnInit() {
  }
  get f() { return this.loginForm.controls }

  onSubmit() {

    console.log("in submit");
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    // Process checkout data here

    this.service.Login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        console.log("Success")
        console.log(data)
        this.spinner.hide();
        if (data.result == "Invalid login details!") {

        }
        else {
          this.result = data;
          localStorage.clear();
          localStorage.setItem('userdetails', JSON.stringify(data.result[0]))

          this.userdata = JSON.parse(localStorage.getItem('userdetails'));

          this.userrole = this.userdata["userRole"];
          console.log("this.userrole", this.userdata)
          if (this.userrole == 5) {
            alert("User can not login")
          } else {
            this.router.navigate(['../home/']);
           }
         
        }
      },
      error => {
        this.spinner.hide();
        console.log("Error")
        console.log(error)
        this.result = error.error.Error;
      })


  }

}
