import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/upload-file.service';
import { ExcelService } from 'src/app/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-pendingrecords',
  templateUrl: './pendingrecords.component.html',
  styleUrls: ['./pendingrecords.component.css']
})
export class PendingrecordsComponent implements OnInit {
  arr:SAPBPCSPending[]=[]
  itemsPerPage=10
  searchText;
  constructor(private service:UploadFileService,private spinner:NgxSpinnerService
    ,private excelService:ExcelService) { }

    ngOnInit() {
      this.getData()
    }
  
    exportAsXLSX():void {
      this.excelService.exportAsExcelFile(this.arr, 'SAP/BPCS Pending Notes');
    }
  
    getData(){
      this.spinner.show();
      this.service.GetSAPBPCSAdviceNotePending().subscribe(
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

class SAPBPCSPending{
  VendorCode;
  VendorName;
  RecordSource;
  PaymentRefNumber;
  PaymentBookingNumber;
  CompanyCode;
  PaymentDate;
}
