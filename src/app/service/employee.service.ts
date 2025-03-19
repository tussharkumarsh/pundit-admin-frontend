import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class EmployeeService {

  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "callCenterEmployee"
  apiUrl1: string = environment.apiUrlForReport + "employee"
  
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken
      })
    };
  }
  put(employeeData:any) {
    return this.http.put(this.apiUrl, employeeData, this._httpHeaders);
  }

  getById() {
    return this.http.get(this.apiUrl + "/getById/" + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id, this._httpHeaders);
  }

  getDataById() {
    return this.http.get(this.apiUrl + "/listByCreatedBy/" + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id + "?size=2000&page=0&sort=createdAt,desc", this._httpHeaders);
  }

  getAll() {
    return this.http.get(this.apiUrl1, this._httpHeaders);
  }

}
