import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,FormControl,Validators,Validator } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-udvdata',
  templateUrl: './udvdata.component.html',
  styleUrls: ['./udvdata.component.css']
})
export class UdvdataComponent implements OnInit {
  checkoutForm:FormGroup;
  submitted = false;
  filetypeerror=false;
  uploadfileresult="";
  exceltemplate:String="";
  modalref:BsModalRef;
  itemsPerPage=10
  fileToUpload: File = null;
  uploadeddata:FileUploaded[]=[];
  searchText;
  filetypesallowed:string[]=["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                              "application/vnd.ms-excel"]
  constructor(private formBuilder: FormBuilder,
    private fileuploadservice:UploadFileService,
    private spinner:NgxSpinnerService,
    private modalservice: BsModalService) { 
      modalref: BsModalRef;
      this.checkoutForm = this.formBuilder.group({
        uploadfiletype: ['',[Validators.required]],
        fileupload: ['',[Validators.required]]
      });

    }

  ngOnInit() {
    this.getUploadedData();
  }

  getExcelTemplate(value){
    console.log(value)
    this.exceltemplate=this.fileuploadservice.fileurl+"ExcelTemplate/";
    if(value == "SAP"){
      this.exceltemplate=this.exceltemplate+"Payment_detail_SAP.xlsx";
    }
    else if(value == "BPCS") {
      this.exceltemplate=this.exceltemplate+"Payment_detail_BPCS.xlsx";
    }
    else if(value == "Bank") {
      this.exceltemplate=this.exceltemplate+"Bank Payment File.xlsx";
    }
    else if(value == "SAP_Vendor") {
      this.exceltemplate=this.exceltemplate+"SAP_vendor.xlsx";
    }
    else if(value == "BPCS_Vendor") {
      this.exceltemplate=this.exceltemplate+"Vendor_BPCS.xlsx";
    }
    else {
      this.exceltemplate=""
    }
  }

  getUploadedData(){
    this.spinner.show();
    this.fileuploadservice.getuploadfilehistory().subscribe(
    data=>{
      this.uploadeddata=data;
      console.log(this.uploadeddata);
      this.spinner.hide();
    },
    error=>{
      this.spinner.hide();
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if(!this.filetypesallowed.find(a => a == this.fileToUpload.type)){
      this.filetypeerror=true;
      this.f.fileupload.setValue("")
    }
    console.log(this.fileToUpload.type)
}

  get f() {return this.checkoutForm.controls}

  onSubmit(customerData) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
        return;
    }
    this.spinner.show();
    // Process checkout data here
    
    this.fileuploadservice.uploadfile(this.f.uploadfiletype.value,this.fileToUpload).subscribe(
      data=>{
        console.log("Success")
        console.log(data)
        this.spinner.hide();
        if(data.IsSuccessStatusCode){
          this.uploadfileresult="File Uploaded Successfully";
          //this.modalref = this.modalservice.show("ServiceStatus", { backdrop: 'static', keyboard: false });
        }
        this.getUploadedData();
        this.checkoutForm.reset();
      },
      error=>{
        this.spinner.hide();
        console.log("Error")
        console.log(error)
        this.uploadfileresult=error.error.Error;
      })
    
  }

}

class FileUploaded{
  UploadedFilesID;
  FileName;
  FileType;
  UploadedDate;
}
