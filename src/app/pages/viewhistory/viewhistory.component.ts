import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-viewhistory',
  templateUrl: './viewhistory.component.html',
  styleUrls: ['./viewhistory.component.css']
})
export class ViewhistoryComponent implements OnInit {
  advisnotearr:PaymentAdviceNote[]=[]
  itemsPerPage=10
  sendnote:any;
  form: FormGroup;
  chkData = [];
  url="https://localhost:44314/";
  //url="https://krios.azurewebsites.net/";
  constructor(private spinner:NgxSpinnerService,private service:UploadFileService,private formBuilder: FormBuilder) {
    /*this.form = this.formBuilder.group({
      sendnote: []
    });*/
   }

  ngOnInit() {
    this.getUploadedData()
  }

  checkboxaction(event,ref){
    console.log(event)
   this.chkData.push(ref)
  }

  

  getUploadedData(){
    this.spinner.show();
    this.service.getPaymentAdvisNoteHeader().subscribe(
    data=>{
      this.advisnotearr=data;
      console.log(this.advisnotearr);
      this.spinner.hide();
    },
    error=>{
      this.spinner.hide();
    })
  }

  sendmail(){
    this.spinner.show();
    let ids=this.chkData;
    console.log(ids);
    this.service.sendmail(ids).subscribe(
    data=>{
      this.advisnotearr=data;
      this.chkData=[];
      this.spinner.hide();
    },
    error=>{
      this.chkData=[];
      this.spinner.hide();
    })
  }

}
class PaymentAdviceNote{
  PaymentAdviceNoteHeaderID;
  VendorCode;
  VendorContanctName
  VendorEmail
  VendorAccount
  VendorBankIFSC
  VendorBankName
  ChequeUTRNo
  MailSendFlag
}

