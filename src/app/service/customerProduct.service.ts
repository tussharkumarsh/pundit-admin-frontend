import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class CustomerProductService {

  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "customerProduct"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken
      })
    };
  }

  post(customerProductData:any) {
    return this.http.post(this.apiUrl, customerProductData, this._httpHeaders);
  }

  put(customerProductData:any) {
    return this.http.put(this.apiUrl, customerProductData, this._httpHeaders);
  }
  getByCustomerId(page:any, size:any, customerId:any) {
    return this.http.get(this.apiUrl + '/customer/' + customerId + '?size=2000&page='+page+'&sortBy=createdAt,desc', this._httpHeaders);
  }
  getProductId(id:any) {
    return this.http.get(environment.apiUrl + "product" + '/getById/' + id, this._httpHeaders);
  }

  getAllCustomerProduct(size:any, page:any) {
    return this.http.get(environment.apiUrl +  'customerProduct?size=' + size + '&page=' + page + '&sort=createdAt,desc', this._httpHeaders);
  }

  getAllShopifyCustomerProduct(size:any, page:any) {
    return this.http.get(environment.apiUrl +  'customerProduct/checkouts?size=' + size + '&page=' + page + '&sort=created_at,desc', this._httpHeaders);
  }

  customerRegistered(fromTime:any, toTime:any) {
    return this.http.get(this.apiUrl + '/countByCreatedAtBetweenAndCreatedBy' + '?from=' + fromTime + '&to=' + toTime, this._httpHeaders);
  }

  tempSerialNoProductsByEmp(fromTime:any, toTime:any) {
    return this.http.get(this.apiUrl + '/countByCreatedAtBetweenAndTempSerialNumberAndCreatedBy' + '?from=' + fromTime + '&to=' + toTime, this._httpHeaders);
  }

  allTempSerialNoProductsByEmp() {
    return this.http.get(this.apiUrl + '/countByTempSerialNumberAndCreatedBy', this._httpHeaders);
  }

  allProductsRegisteredByEmp() {
    return this.http.get(this.apiUrl + '/countByCreatedBy', this._httpHeaders);
  }

  searchByCustomerContactOrCustomerProductSerialNumber(requestNumber:any) {
    return this.http.put(this.apiUrl + '/searchByCustomerContactOrCustomerProductSerialNumber?size=40&page=0&sort=requestNumber,desc', requestNumber, this._httpHeaders);
  }
  getById(id:any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }
  searchbyCustomerProductSerialNumber(serialNumber:any){
    return this.http.put(this.apiUrl + '/search/serialNumber?size=200&page=0&sort=createdAt,desc', serialNumber, this._httpHeaders);
  }
  getCustomerProductAndCallHistory(serialNumber:any) {
    return this.http.get(this.apiUrl + '/getCustomerProductAndCallHistory/' + serialNumber, this._httpHeaders);
  }
  getAllcustomerProduct(size:any, page:any) {
    return this.http.get(this.apiUrl + '?size=' + size + '&page=' + page + '&sort=createdAt,desc', this._httpHeaders);
  }
}
