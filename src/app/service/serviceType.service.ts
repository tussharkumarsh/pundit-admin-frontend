import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class ServiceTypeService {
  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "serviceType"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken
      })
    };
  }

  getAll() {
    return this.http.get(this.apiUrl + '?size=' + 2000 + '&page=' + 0 + '&sort=createdAt,desc', this._httpHeaders);
  }
}
