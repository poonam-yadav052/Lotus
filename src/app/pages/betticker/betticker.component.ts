import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelService } from 'src/app/excel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-betticker',
  templateUrl: './betticker.component.html',
  styleUrls: ['./betticker.component.css']
})
export class BettickerComponent implements OnInit {

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

  sendmail() {
    this.spinner.show();
    let ids = this.chkData;
    console.log(ids);
    this.service.sendmail(ids).subscribe(
      data => {
        //this.members=data; 
        for (var index in ids) {
          console.log(index)
          //let index1=this.members.findIndex(o=>o.PaymentAdviceNoteHeaderID==index);
          //console.log(index1);
          //this.members[index1].MailSendFlag='Y';
        }
        this.chkData = [];
        this.getUploadedData();
        this.spinner.hide();
      },
      error => {
        this.chkData = [];
        this.spinner.hide();
      })
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