import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class CallCenterEmployeeService {
  private _httpHeaders:any;
  private _httpHeaders2:any;

  apiUrl: string = environment.apiUrl + "callCenterEmployee"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };

    this._httpHeaders2 = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken,
        'acceptHeader': 'application/json',
        // 'authorization': localStorage.getItem('accesstoken'),
        'authorization': localStorage.getItem('accesstoken')!
      })
    };
  }

  post(callData:any) {
    return this.http.post(this.apiUrl + "/createCall", callData, this._httpHeaders);
  }

  put(callData:any) {
    return this.http.put(this.apiUrl, callData, this._httpHeaders);
  }

  getByCustomerId(id:any) {
    return this.http.get(this.apiUrl + '/getByCustomer/' + id + '?size=' + 5 + '&page=' + 0 + '&sort=createdAt,desc', this._httpHeaders);
  }

  getAllEmployee(){
    return this.http.get(this.apiUrl + '/list', this._httpHeaders);
  }

  getReceivedEmail2(){
    return this.http.get(this.apiUrl + '/receivedEmail2', this._httpHeaders2);
  }

}
