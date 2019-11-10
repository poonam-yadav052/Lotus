import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadFileService } from 'src/app/upload-file.service';
import { ExcelService } from 'src/app/excel.service';

@Component({
  selector: 'app-duplicatepayment',
  templateUrl: './duplicatepayment.component.html',
  styleUrls: ['./duplicatepayment.component.css']
})
export class DuplicatepaymentComponent implements OnInit {
  arr:PaymentAdviceHistoryDup[]=[]
  itemsPerPage=10
  sendnote:any;
  chkData = [];
  searchText;
  url=""
  constructor(private spinner:NgxSpinnerService,private service:UploadFileService,
    private excelService:ExcelService) {
    this.url=service.fileurl
   }

  ngOnInit() {
    this.getData()
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.arr, 'Duplicate Payment');
  }

  getData(){
    this.spinner.show();
    this.service.getDuplicatePayment().subscribe(
    data=>{
      this.arr=data;
      console.log(this.arr);
      this.spinner.hide();
    },
    error=>{
      this.spinner.hide();
    })
  }

}

class PaymentAdviceHistoryDup{
  DuplicatePaymentHistoryID;
  BatchNumber;
  SAPPaymentAdviceHistoryID;
  BPCSPaymentAdviceHistoryID;
  SAPVendorName;
  SAPVendorCode;
  BPCSVendorName;
  BPCSVendorCode;
  SAPInvoiceNumber;
  SAPInvoiceDate;
  BPCSInvoiceNumber;
  BPCSInvoiceDate;
  SAPNetPaidAmount;
  BPCSNetPaidAmount;
  UpdatedDate;
}
