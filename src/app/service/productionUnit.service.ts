import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class ProductionUnitService {

  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "productionUnit"

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
    return this.http.get(this.apiUrl + "/getByStatus/" + status + "/productionUnit/" + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.productionUnitId + '?page=0&size=2000&sort=createdAt,desc', this._httpHeaders);
  }

  getInhandSparePartsStocksByTypeWithDetails(type:any) {
    return this.http.get(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.productionUnitId + '/aggregatedProductionUnitSparePartStocksWithDetails/types/' + type + '?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }
  aggregatedProductionUnitDemandedSparePartStocksWithDetails(type:any) {
    return this.http.get(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.productionUnitId + '/aggregatedProductionUnitDemandedSparePartStocksWithDetails/types/' + type + '?size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  sparePartDetailsById(type:any, sparePartId:any) {
    return this.http.get(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.productionUnitId + '/aggregatedProductionUnitSparePartStocks/sparePart/' + sparePartId + '/types/' + type + '?size=50&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  getInhandSparePartsStocksByTypeWithDetailsByIds(type:any, ids:any) {
    return this.http.put(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.productionUnitId + '/aggregatedProductionUnitSparePartStocksWithDetails/filterBySpareParts/types/' + type, ids, this._httpHeaders);
  }

  aggregatedProductionUnitProductStocks(type:any, ids:any) {
    return this.http.put(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser')|| '').employee.productionUnitId + '/aggregatedProductionUnitProductStocks/filterByProducts/type/' + type + "?withProductDetails=true", ids, this._httpHeaders);
  }

  aggregatedProductionUnitSerialSpareStock(type:any, ids:any) {
    return this.http.put(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser')|| '').employee.productionUnitId + '/aggregatedProductionUnitSerialSparePartStocks/filterBySparePart/type/' + type + "?withSparePartDetails=true", ids, this._httpHeaders);
  }

  searchBySerialNumber(type:any, searchKey:any) {
    return this.http.put(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.productionUnitId + '/searchBySerialNumberWithProductDetails/types/' + type + '?size=200&page=0&sort=createdAt,desc', searchKey, this._httpHeaders);
  }

  searchBySerialNumberWithProductDetails(productId:any, type:any, searchKey:any) {
    return this.http.put(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser')|| '').employee.productionUnitId + '/searchBySerialNumberWithProductDetails/product/' + productId + '/point/PRODUCTION_UNIT/types/' + type + '?size=200&page=0&sort=createdAt,desc', searchKey, this._httpHeaders);
  }

  getInhandProductStocksByType(type:any, productDetailsStatus:any) {
    return this.http.get(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.productionUnitId + '/aggregatedProductionUnitProductStocks/type/' + type + '?withProductDetails=' + productDetailsStatus + '&size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  getByProductWithProductDetails(productId:any, type:any) {
    return this.http.put(this.apiUrl + '/' + JSON.parse(sessionStorage.getItem('cshareUser')|| '').employee.productionUnitId + '/getByProductWithProductDetails/' + productId + '/point/PRODUCTION_UNIT/types/' + type + '?size=900&page=0&sort=createdAt,desc', {}, this._httpHeaders);
  }

  getInhandProductStocksByTypeOrder(type:any, productDetailsStatus:any, id:any) {
    return this.http.get(this.apiUrl + '/' + id + '/aggregatedProductionUnitProductStocks/type/' + type + '?withProductDetails=' + productDetailsStatus + '&size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  approvedProductQuantity(productionUnitId:any){
    return this.http.get(this.apiUrl + '/' + productionUnitId + '/remainingCount/type/USABLE?withProductDetails=true&status=COORDINATOR_APPROVED,SALES_ADMIN_APPROVED,FINANCE_EMPLOYEE_APPROVED,APPROVED&requesterPoints=DISTRIBUTOR,PRODUCTION_UNIT', this._httpHeaders )
  }

  getInhandSparePartsStocksByTypeWithDetailsOrder(type:any,id:any) {
    return this.http.get(this.apiUrl + '/' + id + '/productionUnitSparePartStocksWithAllDetails/types/' + type , this._httpHeaders);
  }

}
