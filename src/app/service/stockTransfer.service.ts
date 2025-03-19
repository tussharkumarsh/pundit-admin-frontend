import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class StockTransferService {
  private _httpHeaders:any;
  apiUrl: string = environment.apiUrl + "stockTransfer"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }
  post(stockData:any) {
    return this.http.post(this.apiUrl, stockData, this._httpHeaders);
  }
  getByStatusForServiceCentre(status:any, supplierValue:any) {
    return this.http.get(this.apiUrl + '/getByStatus/' + status + '/serviceCentre/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId + '?supplier=' + supplierValue + '&page=0&size=2000&sort=createdAt,desc', this._httpHeaders);
  }
  generateBill(stockTransferId:any) {
    return this.http.put(this.apiUrl + "/" + stockTransferId + "/generateBill", '', this._httpHeaders);
  }
  markPacked(stockTransferId:any) {
    return this.http.put(this.apiUrl + "/" + stockTransferId + "/markPacked", '', this._httpHeaders);
  }
  markDispatched(stockTransferId:any, data:any) {
    return this.http.put(this.apiUrl + "/" + stockTransferId + "/markDispatched", data, this._httpHeaders);
  }
  reject(stockTransferId:any, remarks:any) {
    return this.http.put(this.apiUrl + "/" + stockTransferId + "/markRejected", remarks, this._httpHeaders);
  }
  getByIds(ids:any) {
    return this.http.put(this.apiUrl + '/getByIds', ids, this._httpHeaders);
  }
  getById(id:any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }
  generateGrn(stockTransferId:any, grnData:any) {
    return this.http.put(this.apiUrl + "/" + stockTransferId + "/generateGRN", grnData, this._httpHeaders);
  }
  markReceived(stockTransferId:any) {
    return this.http.put(this.apiUrl + "/" + stockTransferId + "/markReceived", '', this._httpHeaders);
  }
  getByStatusAndId(status:any,size:any,page:any,sortType:any){
    return this.http.get(this.apiUrl + "/listByStatusAndCreatedBy/status/" + status + "/createdBy/" +JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.id +'?size='+ size + '&page='+ page + '&sort=' + sortType  , this._httpHeaders);
  }
  getByStatusAndSupplierIdAndRecieverId(status:any,receiverPoint:any,size:any,page:any,sortType:any){
    return this.http.get(this.apiUrl + "/listByStatusAndSuppliedByAndRecivedBy/status/" + status + "/suppliedBy/" 
    +JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId +"/receiverPoint/"+receiverPoint+'?size='+ size + '&page='+ page + '&sort=' + sortType  , this._httpHeaders);
  }
}