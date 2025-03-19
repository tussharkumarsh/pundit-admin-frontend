import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class TechnicalConcernService {

  private _httpHeaders:any;
  apiUrl: string = environment.apiUrl + "technicalConcern"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareServiceCenter')||'').authToken
      })
    };
  }

  getAll() {
    return this.http.get(this.apiUrl + '?size=' + 2000 + '&page=' + 0 + '&sort=primary', this._httpHeaders);
  }

  searchByPrimaryConern(primaryConcern:any){
    return this.http.put(this.apiUrl + '/searchByPrimaryConern?size=200&page=0&sort=primaryConcern,desc', primaryConcern, this._httpHeaders);
  }
}
