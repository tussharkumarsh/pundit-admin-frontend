import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class SparePartStockService {

  private _httpHeaders :any;
  apiUrl: string = environment.apiUrl + "sparePartStock"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken,
        observe: 'response'
      })
    };
  }

  post(productData:any) {
    return this.http.post(this.apiUrl, productData, this._httpHeaders);
  }

  put(productData:any) {
    return this.http.put(this.apiUrl, productData, this._httpHeaders);
  }
  getById(id:any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }

  getByIds(ids:any) {
    return this.http.put(this.apiUrl + '/getByIds', ids, this._httpHeaders);
  }

  getAll(page:any, size:any) {
    return this.http.get(this.apiUrl + '?page=' + page + '&size=' + size, this._httpHeaders);
  }

  getByServiceCentreWise(serviceCentreId:any) {
    return this.http.put(this.apiUrl + '/serviceCentre/' + serviceCentreId, '', this._httpHeaders);
  }

}
