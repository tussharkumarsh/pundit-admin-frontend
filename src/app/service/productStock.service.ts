import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class ProductStockService {

  private _httpHeaders:any;
  apiUrl: string = environment.apiUrl + "productStock"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')|| '').authToken
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
  createMultipleProductStocks(productStock:any) {
    return this.http.post(this.apiUrl + "/createMultipleProductStocks", productStock, this._httpHeaders);
  }
  getProductStockByTypeAndId(productId:any,type:any){
    return this.http.put(this.apiUrl + '/productionUnit/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.productionUnitId +
    '/product/'+ productId + '/types/' + type + '?page='+ 0 + '&size=' + 2000,'',this._httpHeaders);
  }

  deleteProductStockBySerialNo(SerialNumber:any){
    return this.http.delete(this.apiUrl + '/removeProductStockBySerialNumber/'+ SerialNumber,this._httpHeaders);
  }

  getByServiceCentreWise(serviceCentreId:any) {
    return this.http.put(this.apiUrl + '/serviceCentre/' + serviceCentreId, '', this._httpHeaders);
  }
}
