import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class ComposeMailService {
  private _httpHeaders: any;

  apiUrl: string = environment.apiUrl + "callCenterEmployee"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken
      })
    };
  }

  post(callData: any) {
    return this.http.post(this.apiUrl + "/createCall", callData, this._httpHeaders);
  }

  put(callData: any) {
    return this.http.put(this.apiUrl, callData, this._httpHeaders);
  }

  composeMail(to:any, from:any, msg:any, subject:any, CC:any, BCC:any) {
    return this.http.put(this.apiUrl + '/sendEmail?to=' + to + '&from=' + from + '&msg=' + msg + '&sub=' + subject + '&cc=' + CC + '&bcc='+ BCC, '', this._httpHeaders);
  }
}
