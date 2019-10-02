import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,FormControl,Validators,Validator } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';

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
  modalref:BsModalRef;
  fileToUpload: File = null;
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
        this.checkoutForm.reset();
      },
      error=>{
        console.log("Error")
        console.log(error)
        this.uploadfileresult="File Upload failed,please try again";
      })
    
  }

}
