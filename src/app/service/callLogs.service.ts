import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class CallLogService {
  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "call";

  ricoApiUrl: string = environment.ricoApiUrl + "getAll";

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken,
        'apiKey': '09cfe283016d2ec4c6f34d274a90d700'

      })
    };
  }

  post(callData:any) {
    return this.http.post(this.apiUrl + "/createCall", callData, this._httpHeaders);
  }

  put(callData:any) {
    return this.http.put(this.apiUrl, callData, this._httpHeaders);
  }

  getAllCallLog(page:any) {
    return this.http.get(this.ricoApiUrl + '?size=1000&page=' + page + '&sort=lastModifiedAt,desc', this._httpHeaders);
  }

  searchByCustomerProductSerailNumber(serialProductNumber:any) {
    return this.http.put(this.apiUrl + '/searchByCustomerProductSerialNumber?size=200&page=0&sort=serialProductNumber,desc', serialProductNumber, this._httpHeaders);
  }
}
