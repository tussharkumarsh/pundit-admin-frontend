import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class DistributorService {
  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "distributor"
  apiUrl1: string = environment.apiUrl + "salesExecutive"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken
      })
    };
  }

  searchByNameOrContact(size:any, page:any, searchKey:any) {
    return this.http.put(this.apiUrl + '/search/nameOrContact?size=' + size + '&page=' + page + '&sort=createdAt,desc', searchKey, this._httpHeaders);
  }

  getById(id:any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }

  getAll() {
    return this.http.get(this.apiUrl, this._httpHeaders);
  }
  
  searchByName(text:any) {
    return this.http.put(this.apiUrl + '/search/nameOrContactOrDistributorCode',text, this._httpHeaders);
  }

  getByType(type: any) {
    return this.http.put(this.apiUrl1 + '/getByType?type=' + type, this._httpHeaders);
  }
  
}
