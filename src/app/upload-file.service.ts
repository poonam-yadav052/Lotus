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
    httpOptions.headers.append("Content-Type","application/json")
  }

  getMemberList(loginid:number):Observable<any>{
    console.log(this.url+"getUsers");
    return this.http.get(this.url+"getMembers?userId="+loginid,httpOptions)
  }

  getUserList(loginid:number):Observable<any>{
    return this.http.get(this.url+"getAdminUsers",httpOptions)
  }

  getPositionTaskList():Observable<any>{
    console.log(this.url+"getUsers");
    return this.http.get(this.url+"getPositionTaking?userId=1",httpOptions)
  }

  getmaxuser():Observable<any>{
  return this.http.get(this.url+"getUserMax/",httpOptions);
}

  addmember(data:any):Observable<any>{
    return this.http.post(this.url+"saveMember/",data,httpOptions);
  }

  adduser(data:any):Observable<any>{
    return this.http.post(this.url+"addAdminUsers/",data,httpOptions);
  }

  Login(username:string,password:string):Observable<any>{
    const formData:any={"userName":username,"password":password,"loginIp":"192.168.1.100"}
    return this.http.post(this.url+"login",formData,httpOptions)
  }

}
