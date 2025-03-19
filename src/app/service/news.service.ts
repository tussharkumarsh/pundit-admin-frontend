import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class NewsService {
  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "news"
  apiUrlReport: string = environment.apiUrlForReport + "news"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  post(newsData:any) {
    return this.http.post(this.apiUrl, newsData, this._httpHeaders);
  }

  put(newsData:any) {
    return this.http.put(this.apiUrl, newsData, this._httpHeaders);
  }

  getAll() {
    return this.http.get(this.apiUrl + '?size=' + 2000 + '&page=' + 0 + '&sort=createdAt,desc', this._httpHeaders);
  }

  getAllByType(type:any) {
    return this.http.get(this.apiUrl + '/getByType?type=' + type + '&size=' + 2000 + '&page=' + 0 + '&sort=createdAt,desc', this._httpHeaders);
  }


  // /fileUpload?type=NEWS&page=0&size=1

  uploadImage(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.apiUrl + '/fileUpload?type=NEWS', formData, this._httpHeaders);
}
  
}
