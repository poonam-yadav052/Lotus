import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelService } from 'src/app/excel.service';
@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.component.html',
  styleUrls: ['./vendorlist.component.css']
})
export class VendorlistComponent implements OnInit {
  vendorarr:Vendor[]=[]
  selectedvendor:Vendor;
  itemsPerPage=10
  type:number;
  sendnote:any;
  form: FormGroup;
  chkData = [];
  modalref: BsModalRef;
  alternateemail:string;
  vendorid:number;
  constructor(private spinner:NgxSpinnerService,private service:UploadFileService,
    private formBuilder: FormBuilder,private modalservice:BsModalService,private excelService:ExcelService) {
    /*this.form = this.formBuilder.group({
      sendnote: []
    });*/
   }

  ngOnInit() {
    this.getUploadedData()
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.vendorarr, 'Vendor List');
  }

  openModel(modalpoupid: TemplateRef<any>,type:number,vendorid:number) { 
    this.vendorid=vendorid 
    this.type=type
    console.log(this.vendorid)
    console.log(this.vendorarr)
    this.selectedvendor=this.vendorarr.find(o=>o.VendorMasterID == this.vendorid);
    console.log(this.selectedvendor);
    this.modalref = this.modalservice.show(modalpoupid, { backdrop: 'static', keyboard: false });
    
  }


  getUploadedData(){
    this.spinner.show();
    this.service.getVendorList().subscribe(
    data=>{
      this.vendorarr=data;
      console.log(this.vendorarr);
      this.spinner.hide();
    },
    error=>{
      this.spinner.hide();
    })
  }

  submitvendorform(){
    this.spinner.show();
    this.service.saveVendorInfo(this.vendorid,this.alternateemail).subscribe(
    data=>{
      this.spinner.hide();
      this.modalref.hide();
      this.vendorarr[this.type].VendorAlternateEmailID=this.alternateemail;
    },
    error=>{
      this.spinner.hide();
    })
  }



}
class Vendor{
  VendorMasterID;
  VendorCode;
  VendorName
  VendorEmail
  VendorAlternateEmailID
  VendorContanctName
  VendorBankAccount
  VendorBankIFSC
  VendorBankName
  ChequeUTRNo
  MailSendFlag
}