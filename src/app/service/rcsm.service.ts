import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class RCSMService {
  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "rcsm"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  post(callData:any) {
    return this.http.post(this.apiUrl + "/createCall", callData, this._httpHeaders);
  }

  put(callData:any) {
    return this.http.put(this.apiUrl, callData, this._httpHeaders);
  }

  createRCSM(formData:any) {
    return this.http.post(this.apiUrl + '/createRcsm/', formData, this._httpHeaders);
  }

  getListByCreatedAtBetween(fromDate:any, toDate:any){
    return this.http.get(this.apiUrl + '/listByCreatedAtBetween?from='+ fromDate + '&to=' + toDate, this._httpHeaders);
  }

}
