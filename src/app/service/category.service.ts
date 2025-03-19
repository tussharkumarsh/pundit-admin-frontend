import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)export class CategoryService {

  private _httpHeaders:any;
  apiUrl: string = environment.apiUrl + "category"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')|| '').authToken
      })
    };
  }
  post(categoryData:any) {
    return this.http.post(this.apiUrl, categoryData, this._httpHeaders);
  }

  put(categoryData:any) {
    return this.http.put(this.apiUrl, categoryData, this._httpHeaders);
  }
  getById(id:any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }

  getAll() {
    return this.http.get(this.apiUrl + '?size=100&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  createCategory(formData:any) {
    return this.http.post(this.apiUrl, formData, this._httpHeaders);
  }

  updateCategory(formData:any) {
    return this.http.put(this.apiUrl, formData, this._httpHeaders);
  }

  updateStatus(categoryId:any, status:any) {
    return this.http.put(this.apiUrl + '/statusUpdate?id=' + categoryId + '&active=' + status,  '', this._httpHeaders);
  }

}
