import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class RealEstateProductStockService {

  private _httpHeaders:any;
  apiUrl: string = environment.apiUrl + "realEstateProductStock"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  getById(id:any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }
  
  search(query:any) {
    return this.http.get(this.apiUrl + '/search/sku?query=' + query + '&page=0&size=50&sort=createdAt,desc', this._httpHeaders);
  }
  addUrls(id:any, realEstateVideosAndImageUrlUpdate:any) {
    return this.http.put(this.apiUrl + '/addUrls?' + id ,realEstateVideosAndImageUrlUpdate, this._httpHeaders);
  }

  getAll() {
    return this.http.get(this.apiUrl + '?page=0&size=2000&sort=createdAt,desc', this._httpHeaders);
  }

}
