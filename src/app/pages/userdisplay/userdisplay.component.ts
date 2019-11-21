import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelService } from 'src/app/excel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userdisplay',
  templateUrl: './userdisplay.component.html',
  styleUrls: ['./userdisplay.component.css']
})
export class UserdisplayComponent implements OnInit {

  
  constructor(private spinner: NgxSpinnerService, private service: UploadFileService,
    private formBuilder: FormBuilder,
    private excelService: ExcelService, private router: Router) {
   
  }

  ngOnInit() {
    
  }

  

  

}
