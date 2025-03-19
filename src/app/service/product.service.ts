import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)export class ProductService {

  private _httpHeaders:any;
  apiUrl: string = environment.apiUrl + "product"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser')|| '').authToken
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

  getBystatus() {
    return this.http.get(this.apiUrl + '/getByStatus?status=ACTIVE&size=2000&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  searchByName(size:any, page:any, searchKey:any) {
    return this.http.put(this.apiUrl + '/search/name?size=' + size + '&page=' + page + '&sort=createdAt,desc', searchKey, this._httpHeaders);
  }

  searchByModelNumberOrName(size:any, page:any, searchKey:any) {
    return this.http.put(this.apiUrl + '/search/nameOrModel?size=' + size + '&page=' + page + '&sort=createdAt,desc', searchKey, this._httpHeaders);
  }
  getByIds(ids:any) {
    return this.http.put(this.apiUrl + '/getByIds/', ids, this._httpHeaders);
  }

  getAllCategories() {
    return this.http.get(this.apiUrl + '/getAllCategories', this._httpHeaders);
  }
  getAllProductCompanyBrand() {
    return this.http.get(this.apiUrl + '/getAllProductCompanyBrand', this._httpHeaders);
  }

  searchByCategoryAndModelNumberOrName(size:any, page:any, searchKey:any, category:any) {
    return this.http.put(this.apiUrl + '/searchByCategoryAndSkuOrSkuDescriptionRegex/' + category 
    + '?size=' + size + '&page=' + page + '&sort=createdAt,desc', searchKey, this._httpHeaders);
  }

  getAllSkuGroup(category:any){
    return this.http.get(this.apiUrl + '/getAllSkuGroup?productCategory='+category, this._httpHeaders);
  }
  getAllProductRating(category:any,skuGrp:any,type:any){
    return this.http.get(this.apiUrl + '/getProductRating?productCategory='+category+'&productSkuGrp='+skuGrp+'&productType='+type, this._httpHeaders);
  }
  getAllProductType(skuGrps:any,category:any){
    return this.http.get(this.apiUrl + '/getProductType?productSkuGrp='+skuGrps+'&productCategory='+ category , this._httpHeaders);
  }

  searchByCategoryAndProductTypeAndProductRating(category:any,skuGrp:any,type:any,rating:any,searchKey:any){
    return this.http.put(this.apiUrl + '/searchByCategoryAndTypeAndRating?productCategory=' + category +'&skuGrp='+skuGrp+'&productType='+type+'&productRating='
    + rating+'&size=' + 100 + '&page=' + 0 + '&sort=createdAt,desc', searchKey, this._httpHeaders);
  }
  searchByCategoryAndCompanyBrand(category:any,companyBrand:any,searchKey:any){
    return this.http.put(this.apiUrl + '/searchByCategoryAndCompanyBrand?productCategory=' + category +'&companyBrand='+companyBrand
    +'&size=' + 100 + '&page=' + 0 + '&sort=createdAt,desc', searchKey, this._httpHeaders);
  }
  getAll(size:any,page:any){
    return this.http.get(this.apiUrl + '?page='+ page + '&size=' + size + '&sort=createdAt,desc',this._httpHeaders);
  }

  getListByCreatedAtBetween(fromDate:any, toDate:any){
    return this.http.get(this.apiUrl + '/listByCreatedAtBetween?from='+ fromDate + '&to=' + toDate, this._httpHeaders);
  }

  getProductDetails(productIds:any){
    return this.http.get(this.apiUrl + '/getProductDetails?ids='+ productIds, this._httpHeaders);
  }


  createProduct(formData:any) {
    return this.http.post(this.apiUrl, formData, this._httpHeaders);
  }

  updateProduct(formData:any) {
    return this.http.put(this.apiUrl, formData, this._httpHeaders);
  }

  uploadImage(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.apiUrl + '/fileUpload?type=NEWS', formData, this._httpHeaders);
}
}
