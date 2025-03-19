import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class StockPointService {

  private _httpHeaders:any;

  apiUrl:string=environment.apiUrl + "stockPoint"
  apiUrl1:string=environment.apiUrl
  
  constructor(private http:HttpClient) { 
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token':  JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }
  getById(id:any){
    return this.http.get(this.apiUrl + '/getByLinkedId/'+ id,this._httpHeaders);
  }
  getByIdOnly(id:any){
    return this.http.get(this.apiUrl + '/getById/'+ id,this._httpHeaders);
  }
  sparePartDetailsById(type:any,sparePartId:any,stockPointId:any){
    return this.http.get(this.apiUrl + '/'+ stockPointId +'/aggregatedStockPointSparePartStocks/sparePart/'+ sparePartId + '/types/'+ type  + '?size=50&page=0&sort=createdAt,desc',this._httpHeaders);
  }
  searchBySerialNumber(type:any,searchKey:any,stockPointId:any){
    return this.http.put(this.apiUrl + '/'+ stockPointId +'/searchBySerialNumberWithProductDetails/types/'+ type + '?size=2000&page=0&sort=createdAt,desc',searchKey,this._httpHeaders);
  }

  getInhandSparePartsStocksByTypeWithDetails(stockPointId:any, type:any) {
    return this.http.get(this.apiUrl + '/' + stockPointId + '/aggregatedStockPointSparePartStocksWithDetails/types/' + type + '?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  getInhandSerializeSparePartsStocksByTypeWithDetails(stockPointId:any) {
    return this.http.get(this.apiUrl + '/' + stockPointId + '/aggregatedStockPointSparePartStocksWithDetails2/', this._httpHeaders);
  }

  serialSparePartStock() {
    return this.http.get(this.apiUrl1 + '/serialSparePartStock/', this._httpHeaders);
  }

  serialSparePartStockNew(stockPointId:any) {
    return this.http.get(this.apiUrl1 + 'serialSparePartStock/' + 'inHandSparePart/' + stockPointId, this._httpHeaders);
  }


  getAll(){
    return this.http.get(this.apiUrl + '?size=2000&page=0&sort=createdAt,desc',this._httpHeaders);
  }

  getInhandProductStocksByType(stockPointId:any, type:any, productDetailsStatus:any) {
    return this.http.get(this.apiUrl + '/' + stockPointId + '/aggregatedStockPointProductStocks/type/' + type + '?withProductDetails=' + productDetailsStatus + '&size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  getInhandProductStocksByTypeSeparately(stockPointId:any, type:any) {
    return this.http.get(this.apiUrl + '/' + stockPointId + '/getInhandProductStockSaperately/types/' + type, this._httpHeaders);
  }
  getByIds(ids:any) {
    return this.http.put(this.apiUrl + '/getByIds', ids, this._httpHeaders);
  }
  getAllByServiceCentreId(){
    return this.http.get(this.apiUrl + '/getAllByServiceCentreIdList/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.serviceCentreId + '?page=0&size=2000', this._httpHeaders);
  }
  
  searchProductBySerialNumber(stockPointId:any, type:any, searchKey:any) {
    return this.http.put(this.apiUrl + '/' + stockPointId + '/searchBySerialNumberWithProductDetails/types/' + type + '?size=50&page=0&sort=createdAt,desc', searchKey, this._httpHeaders);
  }
  
  searchSparePartBySerialNumber(type:any, searchKey:any) {
    return this.http.put(this.apiUrl + '/searchBySerialNumberWithSparePartDetails/types/' + type + '?size=50&page=0&sort=createdAt,desc', searchKey, this._httpHeaders);
  }
  getSparePartByType(stockPointId:any, type:any, sparePartId:any) {
    return this.http.get(this.apiUrl + '/' + stockPointId + '/aggregatedStockPointSparePartStocks/sparePart/' + sparePartId + '/types/' + type, this._httpHeaders);
  }
  getByServiceCentre(serviceCentreId:any) {
    return this.http.get(this.apiUrl + '/serviceCentre/' + serviceCentreId, this._httpHeaders);
  }
  serializeSpareParts(productionUnitId:any) {
    return this.http.get(this.apiUrl + '/inHandSparePart/' + productionUnitId, this._httpHeaders);
  }
}
