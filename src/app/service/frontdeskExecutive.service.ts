import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class FrontdeskExecutiveService {
  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "frontDeskExecutive"
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
    return this.http.put(this.apiUrl + '/getByType?type=' + type, this._httpHeaders);
  }

  getFindByRoleAndStatus() {
    return this.http.get(this.apiUrl + '/findByRoleAndStatus/FRONT_DESK_EXECUTIVE/status/ACTIVE?page=0&size=2000', this._httpHeaders);
  }

  onUpdateFDE(formData:any){
    return this.http.put(this.apiUrl, formData, this._httpHeaders);
  }
  
}
