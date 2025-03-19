import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class KnowlarityService {
  private _httpHeaders: any;

  apiUrl: string = environment.knowlarityAPI;

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        // 'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken,
        'x-api-key': 'hyp4w12HeG1MIyhoYCQqs3T1iK2Q4OCD3P9QzkRr',
        'Authorization': '18e59376-d373-45e5-9a0d-9c088b9a95d3',
        'content-type' : 'application/json'
      })
    };
  }


  makeACall(callData: any) {
    return this.http.post(this.apiUrl, callData, this._httpHeaders);
  }


}
