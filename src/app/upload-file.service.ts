import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from  'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders()
};
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  env='prod';
  baseurl=""
  url
  fileurl="https://krios.azurewebsites.net/"
  
  constructor(private http: HttpClient) { 
    this.baseurl=this.env=="dev"?"http://localhost:3000/matieres/":"http://localhost:3000/matieres/";
    this.url=this.baseurl;
    this.fileurl=this.baseurl+"";
  }

  getMemberList():Observable<any>{
    console.log(this.url+"getUsers");
    return this.http.get(this.url+"getMembers?userId=1",httpOptions)
  }
  getPositionTaskList():Observable<any>{
    console.log(this.url+"getUsers");
    return this.http.get(this.url+"getPositionTaking?userId=1",httpOptions)
  }

  getmaxuser():Observable<any>{
  return this.http.get(this.url+"getUserMax/",httpOptions);
}

addmember(data:any):Observable<any>{
  return this.http.post(this.url+"saveUser/",data,httpOptions);
}





  uploadfile(filetype,fileToUpload):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    formData.append('type',filetype);
    return this.http.post(this.url+"uploadfile",formData,httpOptions)
  }

  getuploadfilehistory():Observable<any>{
    console.log(this.url+"getuploadfilehistory");
    return this.http.get(this.url+"getuploadfilehistory",httpOptions)
  }

  getPaymentHistoryDup():Observable<any>{
    return this.http.get(this.url+"GetPaymentAdviceHistoryDup",httpOptions);
  }

  GetGeneratePaymentAdvanceNote():Observable<any>{
    return this.http.get(this.url+"GetGeneratePaymentAdvanceNote",httpOptions);
  }

  GeneratePaymentAdvanceNote():Observable<any>{
    return this.http.get(this.url+"GeneratePaymentAdvanceNote",httpOptions);
  }

  getVendorList():Observable<any>{
    return this.http.get(this.url+"GetVendorMaster",httpOptions);
  }

  getPaymentAdvisNoteHeader():Observable<any>{
    return this.http.get(this.url+"getPaymentAdvisNoteHeader",httpOptions);
  }

  getDuplicatePayment():Observable<any>{
    return this.http.get(this.url+"GetDuplicatePaymentHistory",httpOptions);
  }

  GetBankPaymentsAdviceNotePending():Observable<any>{
    return this.http.get(this.url+"GetBankPaymentsAdviceNotePending",httpOptions);
  }

  GetSAPBPCSAdviceNotePending():Observable<any>{
    return this.http.get(this.url+"GetSAPBPCSPending",httpOptions);
  }

  Login(username:string,password:string):Observable<any>{
    //const formData: FormData = new FormData();
    //formData.append('username', username);
    //password=btoa(password)
    //formData.append('password',password);
    //console.log(btoa(password))
    const formData:any={"userName":username,"password":password,"loginIp":"192.168.1.100"}
    return this.http.post(this.url+"login",formData,httpOptions)
  }

  sendmail(ids:string[]):Observable<any>{
    const formData: FormData = new FormData();
    let idsarr=JSON.stringify(ids);
    console.log(idsarr)
    formData.append('ids', idsarr);
    return this.http.post(this.url+"sendmail",formData,httpOptions)
  }

  saveVendorInfo(vendorid:number,mailid:string):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('vendorid', vendorid.toString());
    formData.append('mailid', mailid);
    return this.http.post(this.url+"editVendor",formData,httpOptions)
  }


}
