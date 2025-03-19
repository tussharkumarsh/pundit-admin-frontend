import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'

@Injectable(
  { providedIn: 'root' }
)
export class SignupService {

  private _httpHeaders: any;

  apiUrl:string=environment.apiUrl + "signup"
  constructor(private http:HttpClient) { 
  }

  post(loginData: any){
    return this.http.post(this.apiUrl,loginData,this._httpHeaders).map(result=>result);
  }

  createUser(formData:any) {
    return this.http.post(this.apiUrl + '?isUserAvailable=true', formData, this._httpHeaders);
  }

  updateUser(formData:any) {
    return this.http.put(this.apiUrl, formData, this._httpHeaders);
  }

  checkUsernameAvailable(loginId: any){
    return this.http.put(this.apiUrl + '/usernameAvailable?query='+ loginId, this._httpHeaders).map(result=>result);
  }
}
