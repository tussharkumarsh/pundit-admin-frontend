import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class GoodsPendingCallsService {

  private _httpHeaders:any;
  apiUrl: string = environment.apiUrl + "goodsPendingCalls"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }
  getByCallIdWithDetails(callId:any) {
    return this.http.get(this.apiUrl + '/getByCallIdWithDetails/' + callId, this._httpHeaders);
  }
}
