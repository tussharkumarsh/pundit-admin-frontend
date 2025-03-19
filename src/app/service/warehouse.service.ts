import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)

export class WarehouseService {

  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "warehouse"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  post(productData:any) {
    return this.http.post(this.apiUrl, productData, this._httpHeaders);
  }

  put(productData:any) {
    return this.http.put(this.apiUrl, productData, this._httpHeaders);
  }

  getById(id:any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }

  getAll(page:any, size:any) {
    return this.http.get(this.apiUrl + '?page=' + page + '&size=' + size, this._httpHeaders);
  }

  getByStatus(status:any) {
    return this.http.get(this.apiUrl + "/getByStatus/" + status + "/warehouse/" + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.warehouseId + '?page=0&size=2000&sort=createdAt,desc', this._httpHeaders);
  }

  getInhandSparePartsStocksByTypeWithDetails(type:any) {
    return this.http.get(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.warehouseId + '/aggregatedWarehouseSparePartStocksWithDetails/types/' + type + '?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  sparePartDetailsById(type:any, sparePartId:any) {
    return this.http.get(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.warehouseId + '/aggregatedWarehouseSparePartStocks/sparePart/' + sparePartId + '/types/' + type + '?size=50&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  getInhandSparePartsStocksByTypeWithDetailsByIds(type:any, ids:any) {
    return this.http.put(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.warehouseId + '/aggregatedWarehouseSparePartStocksWithDetails/filterBySpareParts/types/' + type , ids, this._httpHeaders);
  }

  aggregatedWarehouseProductStocks(type:any, ids:any) {
    return this.http.put(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.warehouseId + '/aggregatedWarehouseProductStocks/filterByProducts/type/' + type + "?withProductDetails=true", ids, this._httpHeaders);
  }

  searchBySerialNumber(type:any,searchKey:any){
    return this.http.put(this.apiUrl + '/'+ JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.warehouseId  +'/searchBySerialNumberWithProductDetails/types/'+ type + '?size=200&page=0&sort=createdAt,desc',searchKey,this._httpHeaders);
  }

  searchBySerialNumberWithProductDetails(productId:any,type:any,searchKey:any){
    return this.http.put(this.apiUrl + '/'+ JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.warehouseId  +'/searchBySerialNumberWithProductDetails/product/'+ productId + '/point/WAREHOUSE/types/' + type+ '?size=200&page=0&sort=createdAt,desc',searchKey,this._httpHeaders);
  }
  
  getInhandProductStocksByType(type:any,productDetailsStatus:any){
    return this.http.get(this.apiUrl + '/'+ JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.warehouseId +'/aggregatedWarehouseProductStocks/type/'+ type +'?withProductDetails=' + productDetailsStatus + '&size=2000&page=0&sort=createdAt,desc',this._httpHeaders);
  }
}
