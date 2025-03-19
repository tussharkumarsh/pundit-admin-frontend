import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class SerivceEngineerService {
  private _httpHeaders:any;

  apiUrl:string=environment.apiUrl + "serviceEngineer"
  constructor(private http:HttpClient) { 
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }
  getAll(){
    return this.http.get(this.apiUrl + '?size=2000&page=0&sort=createdAt,desc',this._httpHeaders);
  }

  getById(id:any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }
  
  getAllByServiceCntreIds() {
    return this.http.put(this.apiUrl + '/getAllServiceEngineerByServiceCentreIds'+'?size=2000&page=0', JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreIds, this._httpHeaders);
  }

  getByServiceCentreId(id:any){
    return this.http.put(this.apiUrl + '/getAllServiceEngineerByServiceCentreIds'+'?size=2000&page=0', id, this._httpHeaders);
  }

  searchByServiceEngineerName(query:any){
    return this.http.put(this.apiUrl + '/search/nameOrContact'+'?size=2000&page=0', query, this._httpHeaders);
  }
  getByServiceCentreAndServiceType(serviceCentreId:any,serviceTypeId:any,serviceEngineerIds:any){
    return this.http.get(this.apiUrl + "/getByServiceCentreAndServiceTypeAndServiceEngineerIds/" + serviceCentreId + "/" + serviceTypeId + "/" + serviceEngineerIds + "?size=200&page=0&sort=createdAt,desc", this._httpHeaders);
  }

  createServiceEngineer(formData:any) {
    return this.http.post(this.apiUrl + '/createServiceEngineer', formData, this._httpHeaders);
  }

  updateServiceEngineer(formData:any) {
    return this.http.put(this.apiUrl, formData, this._httpHeaders);
  }
}