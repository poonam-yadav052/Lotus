import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelService } from 'src/app/excel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  members: Members[] = []
  itemsPerPage = 10
  sendnote: any;
  form: FormGroup;
  chkData = [];
  searchText;
  userdata:any;
  loginuserid:number
  url = ""
  modalref: BsModalRef;
  constructor(private spinner: NgxSpinnerService, private service: UploadFileService,
    private formBuilder: FormBuilder,
    private excelService: ExcelService, private router: Router,private modalservice: BsModalService) {
    /*this.form = this.formBuilder.group({
      sendnote: []
    });*/
    this.url = service.fileurl
  }

  ngOnInit() {
    this.userdata=JSON.parse(localStorage.getItem('userdetails'));
    this.loginuserid=this.userdata["ID"]
    this.getUploadedData()
  }

  addnewmember() {
    this.router.navigate(['addmember/']);
  }

  checkboxaction(event, ref) {
    console.log(event)
    this.chkData.push(ref)
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.members, 'Payment Advisory Note');
  }

  getUploadedData() {
    this.spinner.show();
    this.service.getMemberList(this.loginuserid).subscribe(
      data => {
        if (data.messege == "Success") {
          this.members = data.result;
          console.log(this.members);
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
      })
  }

  openModel(modalpoupid: TemplateRef<any>,type:number,index:number) {
    
    this.modalref = this.modalservice.show(modalpoupid, { backdrop: 'static', keyboard: false });
  }



}

class Members {
  loginName
  userName
  downline
  bettingStatus
  status
  details
  netexposure
  take
  give
  creditLimit
  createdDate
  lastLogin
  paymentThreshould

}
