import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class SourcingSalesExecutiveUnmappingThresholdService {

  private _httpHeaders: any;
  apiUrl: string = environment.apiUrl + "sourcingSalesExecutiveUnmappingThreshold"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  getAll() {
    return this.http.get(this.apiUrl + "?page=0&size=1&sort=createdAt", this._httpHeaders);
  }
  post(data: any) {
    return this.http.post(this.apiUrl + "/createOrUpdate", data, this._httpHeaders);
  }
}
