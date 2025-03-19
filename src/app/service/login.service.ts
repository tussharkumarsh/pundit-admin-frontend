import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'

@Injectable(
  { providedIn: 'root' }
)
export class LoginService {

  private _httpHeaders: any;

  apiUrl:string=environment.apiUrl + "login"
  constructor(private http:HttpClient) { 
  }

  post(loginData: any){
    return this.http.post(this.apiUrl,loginData,this._httpHeaders).map(result=>result);
  }

  serverSettingGetByKey(key: any){
    return this.http.get(environment.apiUrl +'serverSettings/getByKey?key='+key+'&size=2000&page=0',this._httpHeaders);
  }
}
