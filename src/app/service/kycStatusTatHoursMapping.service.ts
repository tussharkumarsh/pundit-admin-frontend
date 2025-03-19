import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class KycStatusTatHoursMappingService {

  private _httpHeaders: any;
  apiUrl: string = environment.apiUrl + "kycStatusTatHoursMapping"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  getAll() {
    return this.http.get(this.apiUrl + '?size=' + 2000 + '&page=' + 0 + '&sort=createdAt,desc', this._httpHeaders);
  }
  post(data: any) {
    return this.http.post(this.apiUrl, data, this._httpHeaders);
  }
}
