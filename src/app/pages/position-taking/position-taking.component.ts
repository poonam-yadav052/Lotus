import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelService } from 'src/app/excel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-position-taking',
  templateUrl: './position-taking.component.html',
  styleUrls: ['./position-taking.component.css']
})
export class PositionTakingComponent implements OnInit {
  positionTaking: any;

  constructor(private spinner: NgxSpinnerService, private service: UploadFileService,
    private formBuilder: FormBuilder,
    private excelService: ExcelService, private router: Router) { }

  ngOnInit() {
    this.getPositionTakingData()
  }
  getPositionTakingData() {
    this.spinner.show();
    this.service.getPositionTaskList().subscribe(
      data => {
        if (data.messege == "Success") {
          this.positionTaking = data.result;
          console.log(this.positionTaking);
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
      })
  }

}
