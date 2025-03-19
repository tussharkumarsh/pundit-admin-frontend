import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class PincodeMappingService {

  private _httpHeaders:any;
  apiUrl:string=environment.apiUrl + "pincodeMapping"

  constructor(private http:HttpClient) { 
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken     })
    };
  }
  post(leadCategoryData:any){
    return this.http.post(this.apiUrl,leadCategoryData, this._httpHeaders);
  }

  put(leadCategoryData:any){
    return this.http.put(this.apiUrl,leadCategoryData,this._httpHeaders);
  }

  getAll(size:any,page:any){
    return this.http.get(this.apiUrl +'/getAll?size=' +size + '&page=' + page  + '&sort=createdAt,desc',this._httpHeaders);
  }

  getById(id:any){
    return this.http.get(this.apiUrl + '/getById/'+ id,this._httpHeaders);
  }

  searchLocality(searchKey:any){
    return this.http.put(this.apiUrl + '/search/locality', searchKey,this._httpHeaders);
  }
  searchLocalityOrPincode(searchKey:any){
    return this.http.put(this.apiUrl + '/search/pincodeOrlocality', searchKey,this._httpHeaders);
  }
  getByPincodeMappingId(id:any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }
}
