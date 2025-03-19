import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class ServiceCentreService {

  private _httpHeaders:any;
  apiUrl: string = environment.apiUrl + 'serviceCentre'

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')||'').authToken
      })
    };
  }

  getByIds(ids:any) {
    return this.http.put(this.apiUrl + '/getByIds', ids, this._httpHeaders);
  }

  getAll() {
    return this.http.get(this.apiUrl + '?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }
  getByRoleAndStatus(status:any, role:any,serviceCentreId:any) {
    return this.http.get(this.apiUrl + '/' + serviceCentreId + '/allByRoleAndStatus/' + role + '/' + status + '?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }
  getAllByIds() {
    return this.http.put(this.apiUrl + '/getByIds' + '?size=2000&page=0', JSON.parse(sessionStorage.getItem('cshareServiceCenter')||'').employee.serviceCentreIds, this._httpHeaders);
  }

  getById(id:any){
    return this.http.get(this.apiUrl + '/getById/'+ id,this._httpHeaders);
  }
  searchServiceCentreViaPincode(pincode:any,productCategory:any){
    return this.http.get(this.apiUrl+'/searchServiceCenter/pincode/'+pincode+'/prdCtg/'+productCategory,  this._httpHeaders);
  }

  getByRoleAndStatuss(status:any, role:any) {
    return this.http.get(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareServiceCenter') || '').employee.serviceCentreId + '/allByRoleAndStatus/' + role + '/' + status + '?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  getInhandFilterProductStocksByType(types:any,productId:any,point:any){
    return this.http.put(this.apiUrl + '/'+ JSON.parse(sessionStorage.getItem('cshareScsmUser')||'').employee.serviceCentreId 
    +'/productStockWithProductDetails/product/'+productId+'/point/'+point+'/types/'+ types +
    '?size=2000&page=0&sort=createdAt,desc','',this._httpHeaders);
  }

  onCreateServiceCentre(formData:any){
    return this.http.post(this.apiUrl + '/createServiceCentre', formData, this._httpHeaders);
  }

  onUpdateServiceCentre(formData:any){
    return this.http.put(this.apiUrl, formData, this._httpHeaders);
  }
}
