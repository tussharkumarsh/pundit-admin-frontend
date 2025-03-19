import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)

export class SalesExecutiveService {

  private _httpHeaders: any;

  apiUrl: string = environment.apiUrl + "salesExecutive"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  post(channelData: any) {
    return this.http.post(this.apiUrl, channelData, this._httpHeaders);
  }

  put(channelData: any) {
    return this.http.put(this.apiUrl, channelData, this._httpHeaders);
  }

  getById(id: any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }

  getAll() {
    return this.http.get(this.apiUrl + '?page=' + 1 + '&size=' + 2000, this._httpHeaders);
  }
  getByIds(ids: any) {
    return this.http.put(this.apiUrl + '/getByIds/', ids, this._httpHeaders);
  }
  getByType(type: any) {
    return this.http.put(this.apiUrl + '/getByType?type=' + type + '&authToken='+ JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken, this._httpHeaders);
  }

}
