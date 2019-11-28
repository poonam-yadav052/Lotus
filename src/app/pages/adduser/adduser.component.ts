import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  userdata: any;
  creditlimit: number
  userrole: number;
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private service: UploadFileService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.userdata = JSON.parse(localStorage.getItem('userdetails'));
    this.creditlimit = this.userdata["creditLimit"]
    this.userrole = this.userdata["userRole"]
    this.userForm = this.formBuilder.group({
      loginName: ['', Validators.required],
      status: ['', [Validators.required]],
      password: ['', [Validators.required]],
      resetpassword: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],


    });
  }

  get f() { return this.userForm.controls }

  onSubmit() {
    console.log("submit")
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.userForm.invalid)
    if (this.userForm.invalid) {
      return;
    }
    let data: any = Object.assign(this.userForm.value);
    console.log(data)
    this.spinner.show();
    data.createdBy = this.userrole;
    data.userRole = 5;
    this.service.adduser(data).subscribe(
      data => {
        this.spinner.hide();
        console.log(data);
        let path = '/userlist';
        this.router.navigate([path]);
        this.registered = true;
      },
      error => {
        console.log(error)
        this.spinner.hide();
      }

    )
    this.registered = true;
  }

}
