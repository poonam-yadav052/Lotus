import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService, CarouselConfig } from 'ngx-bootstrap';
import { UploadFileService } from 'src/app/upload-file.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelService } from 'src/app/excel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  members: Users[] = []
  itemsPerPage = 10
  sendnote: any;
  form: FormGroup;
  chkData = [];
  searchText;
  userdata:any;
  loginuserid:number
  url = ""
  constructor(private spinner: NgxSpinnerService, private service: UploadFileService,
    private formBuilder: FormBuilder,
    private excelService: ExcelService, private router: Router) {
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
    this.router.navigate(['adduser/']);
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
    this.service.getUserList(this.loginuserid).subscribe(
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



}
class Users{
  ID;
userRole;
userName;
firstName;
lastName;
loginName;
password;
notes;
status;
createdDate;
lastLogin;
roleName;
betSettingId;
cricket;
fancyMarkets;
exchRuns;
football;
Tennis;
horseRacing;
greyhoundRacing;
casino;
positionTakingId;
posSport;
posCricket;
posFootball;
posTennis;
posHorseRacing;
posGreyhoundRacing;
posCasino;
creditLimit;
paymentThreshould;
creditlimitId;
}
