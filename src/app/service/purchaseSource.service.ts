import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class PurchaseSourceService {
  private _httpHeaders:any;

  apiUrl:string=environment.apiUrl + "purchaseSource"
  constructor(private http:HttpClient) { 
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken
      })
    };
  }

  getAll(size:any,page:any){
    return this.http.get(this.apiUrl +'?size=' +size + '&page=' + page + '&sort=createdAt,desc',this._httpHeaders);
  }
}
