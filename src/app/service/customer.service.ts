import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class CustomerService {
  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "customer"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken
      })
    };
  }

  post(customerData:any) {
    return this.http.post(this.apiUrl, customerData, this._httpHeaders);
  }

  put(customerData:any) {
    return this.http.put(this.apiUrl, customerData, this._httpHeaders);
  }

  searchByContact(size:any, page:any, searchKey:any) {
    return this.http.put(this.apiUrl + '/search/contact?size=' + size + '&page=' + page + '&sort=createdAt,desc', searchKey, this._httpHeaders);
  }

  searchByContactOrName(size:any, page:any, searchKey:any) {
    return this.http.put(this.apiUrl + '/search/contactOrFullName?size=' + size + '&page=' + page + '&sort=createdAt,desc', searchKey, this._httpHeaders);
  }

  getAll(size:any, page:any) {
    return this.http.get(this.apiUrl + '/getAll?size=' + size + '&page=' + page + '&sort=createdAt,desc', this._httpHeaders);
  }

  getAllShopify() {
    return this.http.get(this.apiUrl + '/shopify', this._httpHeaders);
  }

  getAllCustomers(size:any, page:any) {
    return this.http.get(this.apiUrl + '?size=' + size + '&page=' + page + '&sort=createdAt,desc', this._httpHeaders);
  }

  getById(customerId:any) {
    return this.http.get(this.apiUrl + '/getById/' + customerId, this._httpHeaders);
  }

  customerRegistered(fromTime:any, toTime:any) {
    return this.http.get(this.apiUrl + '/countByCreatedAtBetweenAndCreatedBy' + '?from=' + fromTime + '&to=' + toTime, this._httpHeaders);
  }

  searchBySalesExecutiveId() {
    return this.http.put(this.apiUrl + '/getAllBySalesExecutive?size=100&page=0&sort=createdAt,desc','', this._httpHeaders);
  }
  searchBySalesExecutiveIdAndContact(contact:any) {
    return this.http.put(this.apiUrl + '/searchSalesExecutive/contact?size=100&page=0&sort=createdAt,desc',contact, this._httpHeaders);
  }

  updateUser(formData:any) {
    return this.http.put(this.apiUrl, formData, this._httpHeaders);
  }
}
