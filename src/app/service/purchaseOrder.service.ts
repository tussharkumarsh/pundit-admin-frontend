import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable(
  { providedIn: 'root' }
)
export class PurchaseOrderService {
  private _httpHeaders:any;
  apiUrl:string=environment.apiUrl + "purchaseOrder"
  constructor(private http:HttpClient) { 
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token':  JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }
  post(orderData:any){
    return this.http.post(this.apiUrl + '/create', orderData , this._httpHeaders);
  }
  getByStatus(status:any) {
    if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'SERVICE_CENTRE_STORE_MANAGER') {
      return this.http.get(this.apiUrl + "/getByStatus/" + status + "/serviceCentre/" + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId + '?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);   
    }
    if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'DISTRIBUTOR_EMPLOYEE') {
      return this.http.get(this.apiUrl + "/getByStatus/" + status + "/distributor/" + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.distributorId + '?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
    }else{
      return
    }
  }

  getAllOrders(status:any) {
    return this.http.get(this.apiUrl + "/getByStatus/" + status +'?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  getOrders() {
    return this.http.get(this.apiUrl +'?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  getStatus(status:any){
      return this.http.get(this.apiUrl + "/getByStatus/" + status + "/serviceCentre/" + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId +'?supplier='+true + '&size=2000&page=0&sort=createdAt,desc', this._httpHeaders);   
    }
  reject(stockTransferId:any,remarks:any){
    return this.http.put(this.apiUrl + "/" + stockTransferId + "/markRejected",remarks, this._httpHeaders);
  }
  getByStatusOnly(status:any){
    return this.http.get(this.apiUrl + "/getByStatus/" + status +'?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }
  markRecieved(id:any){
    return this.http.put(this.apiUrl +"/"+id +"/markReceived/serviceCentreId/"+JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId,'', this._httpHeaders);
  }

  markRecievedStock(id:any, serviceCentreId:any){
    return this.http.put(this.apiUrl +"/"+id +"/markReceived/serviceCentreId/"+ serviceCentreId,'', this._httpHeaders);
  }

  assignReceivedQuantity(orderId:any,productData:any) {
    return this.http.put(this.apiUrl + "/" + orderId + "/assignReceivedQuantity",productData,  this._httpHeaders);
  }
  getById(id:any){
    return this.http.get(this.apiUrl + "/getById/" + id , this._httpHeaders);
  }
  
  getByStatusAndRequesterIdsRcsmApproval(status:any, rcsmApproved:any, rcsmDecisionGiven:any) {
      return this.http.get(this.apiUrl + "/getByStatus/" + status
        + "/serviceCentres/" + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId
        + '?rcsmApproved=' + rcsmApproved + '&rcsmDecisionGiven=' + rcsmDecisionGiven
        + '&supplier=' + false
        + '&size=1000&page=0&sort=createdAt,desc', this._httpHeaders);
    }
    assignApprovedQuantity(orderId:any, productData:any) {
      return this.http.put(this.apiUrl + "/" + orderId + "/assignApprovedQuantity", productData, this._httpHeaders);
    }
    markApproved(orderId:any, productData:any) {
      return this.http.put(this.apiUrl + "/" + orderId + "/markApproved", productData, this._httpHeaders);
    }
}
