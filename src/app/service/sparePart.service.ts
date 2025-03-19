import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class SparePartService {

  private _httpHeaders :any;
  apiUrl: string = environment.apiUrl + "sparePart"

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

  searchByPartCodeOrDescription(size:any, page:any, text:any) {
    return this.http.put(this.apiUrl + '/search/partCodeOrDescription?size=' + size + "&page=" + page, text, this._httpHeaders);
  }

  searchByPartCodeOrDescriptionWithCustomerProduct(size:any, page:any, text:any, customerProductId:any) {
    return this.http.put(this.apiUrl + '/search/partCodeOrDescription?customerProductId=' + '&size=' + size + "&page=" + page, text, this._httpHeaders);
  }

  getAll(page:any, size:any) {
    return this.http.get(this.apiUrl + '?size=' + size + '&page=' + page, this._httpHeaders);
  }

  getByProductId(productId:any, text:any) {
    return this.http.put(this.apiUrl + '/search/partCodeOrDescription/product/' + productId + '?size=50&page=0', text, this._httpHeaders);
  }

  getByProductSku(productSku:any, text:any) {
    return this.http.put(this.apiUrl + '/search/partCodeOrDescription/productModel/' + productSku + '?size=50&page=0', text, this._httpHeaders);
  }

  searchByPartCodeOrDescriptionWithCustomerProductCategory(text:any, productCategory:any ) {
    return this.http.put(this.apiUrl + '/search/partCodeOrDescription/'+ productCategory, text, this._httpHeaders);
  }

  getListByCreatedAtBetween(fromDate:any, toDate:any){
    return this.http.get(this.apiUrl + '/listByCreatedAtBetween?from='+ fromDate + '&to=' + toDate, this._httpHeaders);
  }
}
