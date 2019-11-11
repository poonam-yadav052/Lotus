import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadFileService } from 'src/app/upload-file.service';
import { ExcelService } from 'src/app/excel.service';
@Component({
  selector: 'app-paymentadvicepending',
  templateUrl: './paymentadvicepending.component.html',
  styleUrls: ['./paymentadvicepending.component.css']
})
export class PaymentadvicependingComponent implements OnInit {
  arr:PaymentAdviceNotePending[]=[]
  itemsPerPage=10
  searchText;
  constructor(private service:UploadFileService,private spinner:NgxSpinnerService
    ,private excelService:ExcelService) { }

  ngOnInit() {
    this.getData()
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.arr, 'Pending Advisory Notes');
  }

  getData(){
    this.spinner.show();
    this.service.GetBankPaymentsAdviceNotePending().subscribe(
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

class PaymentAdviceNotePending{
  CompanyAccountNo;
  BookDate;
  ValueDate;
  TransactionType;
  DebitCreditIndicator;
  SettledAmount;
  CustomerReference;
  BankReference;
  PayNoticeGenerated;
  VendorName;
  ChequeUTRNo;
  AllTransactionDetails;
}

