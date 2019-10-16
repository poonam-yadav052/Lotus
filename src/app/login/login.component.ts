import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private formbuilder:FormBuilder) { 
    this.loginForm = this.formbuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit() {
  }

}
