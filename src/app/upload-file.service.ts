import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from  'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders(  
  )
};
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  url="https://localhost:44314/api/FileUpload/uploadfile";
  
  constructor(private http: HttpClient) { }

  uploadfile(filetype,fileToUpload):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    formData.append('type',filetype);
    return this.http.post(this.url,formData,httpOptions)
  }


}
