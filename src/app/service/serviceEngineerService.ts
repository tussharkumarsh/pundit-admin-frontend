import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class ServiceEngineerService {

  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "serviceEngineer"
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

  getById(serviceEngineerId:any) {
    return this.http.get(this.apiUrl + "/getById/" + serviceEngineerId, this._httpHeaders);
  }

  getDataById() {
    return this.http.get(this.apiUrl + "/listByCreatedBy/" + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id + "?size=2000&page=0&sort=createdAt,desc", this._httpHeaders);
  }

  getPincodeMappingId(pincodeMappingId:any) {
    return this.http.get(this.apiUrl + "/getServiceEngineer/" + pincodeMappingId , this._httpHeaders);
  }
  getByServiceCentreAndServiceType(serviceCentreId:any,serviceTypeId:any,serviceEngineerIds:any){
    return this.http.get(this.apiUrl + "/getByServiceCentreAndServiceTypeAndServiceEngineerIds/" + serviceCentreId + "/" + serviceTypeId + "/" + serviceEngineerIds + "?size=200&page=0&sort=createdAt,desc", this._httpHeaders);
  }
  getByServiceCentreId(id:any){
    return this.http.put(this.apiUrl + '/getAllServiceEngineerByServiceCentreIds'+'?size=2000&page=0', id, this._httpHeaders);
  }
  getAll(){
    return this.http.get(this.apiUrl+'?size=2000&page=0&sort=createdAt,desc',this._httpHeaders);
}
  
  searchByServiceEngineerName(query:any){
    return this.http.put(this.apiUrl + '/search/nameOrContact'+'?size=2000&page=0', query, this._httpHeaders);
  }
}
