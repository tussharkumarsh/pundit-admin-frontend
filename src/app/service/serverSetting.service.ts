import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable(
    { providedIn: 'root' }
  )
export class ServerSettingService {
    private _httpHeaders:any;
    apiUrl: String = environment.apiUrl + "serverSettings"
    
    constructor(private http:HttpClient){
        this._httpHeaders = {
            headers: new HttpHeaders({
                'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken
            })
        }
    }

    getAll(){
        return this.http.get(this.apiUrl+'?size=2000&page=0',this._httpHeaders);
    }
    getByKey(key:any){
        return this.http.get(this.apiUrl +'/getByKey?key='+key+'&size=2000&page=0',this._httpHeaders);
    }
}