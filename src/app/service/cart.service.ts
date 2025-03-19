import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable(
  { providedIn: 'root' }
)
export class CartService {
  private _httpHeaders:any;
  private role;
  private employee;
  apiUrl:string=environment.apiUrl + "cart"
  constructor(private http:HttpClient) { 
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
    this.employee = JSON.parse(sessionStorage.getItem('cshareUser') || '').employee;
    this.role = this.employee.role
  }
  addSparePart(cartData:any){
    return this.http.put(this.apiUrl +'/addToServiceCentreSparePartCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId , cartData,this._httpHeaders);
  }
  addSparePartBySelect(cartData:any, serviceCentreId:any){
    return this.http.put(this.apiUrl +'/addToServiceCentreSparePartCart/' + serviceCentreId, cartData,this._httpHeaders);
  }

  addSparePartBySelectEngineer(cartData:any, serviceEngineerId:any){
    return this.http.put(this.apiUrl +'/addToServiceEngineerSparePartCart/' + serviceEngineerId, cartData,this._httpHeaders);
  }

  addProduct(cartData:any){
    // if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'SERVICE_CENTRE_STORE_MANAGER') {
    return this.http.put(this.apiUrl +'/addToServiceCentreProductCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId , cartData,this._httpHeaders);
    // }
    // if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'DISTRIBUTOR_EMPLOYEE') {
    //   return this.http.put(this.apiUrl + '/addSingleToDistributorProductCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.distributorId, cartData, this._httpHeaders);
    // }else{
    //   return
    // }
  }
  serviceCentreCart(){
    // if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'SERVICE_CENTRE_STORE_MANAGER') {
    return this.http.get(this.apiUrl +'/serviceCentreCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId ,this._httpHeaders);
    // }
    // if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'DISTRIBUTOR_EMPLOYEE') {
    //   return this.http.get(this.apiUrl + '/distributorCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.distributorId, this._httpHeaders);
    // }
  }

  serviceCentreCartList(serviceCentreId:any){
    return this.http.get(this.apiUrl +'/serviceCentreCart/' + serviceCentreId, this._httpHeaders);
  }

  serviceEngineerCartList(serviceEngineerId:any){
    return this.http.get(this.apiUrl +'/serviceEngineerCart/' + serviceEngineerId, this._httpHeaders);
  }

  resetSparePartQuantity(data:any){
    return this.http.put(this.apiUrl +'/resetServiceCentreSparePartCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId ,data,this._httpHeaders);
  }

  resetProductQuantityList(data:any){
    return this.http.put(this.apiUrl +'/resetServiceCentreProductCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId ,data,this._httpHeaders);
  }

  resetProductQuantity(data:any){
    if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'SERVICE_CENTRE_STORE_MANAGER') {
    return this.http.put(this.apiUrl +'/resetServiceCentreProductCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId ,data,this._httpHeaders);
    }
    if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'DISTRIBUTOR_EMPLOYEE') {
      return this.http.put(this.apiUrl + '/restDistributorProductCart/' + this.employee.distributorId, data, this._httpHeaders);
    }else{
      return
    }
  }
  removeSparePart(data:any){
    return this.http.put(this.apiUrl +'/removeFromServiceCentreSparePartCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId ,data,this._httpHeaders);
  }

  removeSparePartList(data:any, serviceCentreId:any){
    return this.http.put(this.apiUrl +'/removeFromServiceCentreSparePartCart/' + serviceCentreId, data, this._httpHeaders);
  }
  removeProduct(data:any){
    // if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'SERVICE_CENTRE_STORE_MANAGER'){
    return this.http.put(this.apiUrl +'/removeFromServiceCentreProductCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId ,data,this._httpHeaders);
    // }
    // if (JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.role == 'DISTRIBUTOR_EMPLOYEE') {
    //   return this.http.put(this.apiUrl + '/removeFromDistributorProductCart/' + this.employee.distributorId, data, this._httpHeaders);
    // }else{
    //   return
    // }
  }
  removeProductList(data:any, serviceCentreId:any){
    return this.http.put(this.apiUrl +'/removeFromServiceCentreProductCart/' + serviceCentreId ,data,this._httpHeaders);
  }

  addProductList(cartData:any, serviceCentreId:any){
    return this.http.put(this.apiUrl +'/addToServiceCentreProductCart/' + serviceCentreId , cartData,this._httpHeaders);
  }

  addProductListCentre(cartData:any, serviceCentreId:any){
    return this.http.put(this.apiUrl +'/addToServiceCentreProductCart/' + serviceCentreId , cartData,this._httpHeaders);
  }

  addProductListEngineer(cartData:any, serviceEngineerId:any){
    return this.http.put(this.apiUrl +'/addToServiceEngineerProductCart/' + serviceEngineerId , cartData,this._httpHeaders);
  }
  

  getDistributorCart(){
    return this.http.get(this.apiUrl + '/distributorCart/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.distributorId, this._httpHeaders);
  }
}
