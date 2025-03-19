import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)

export class ChannelPartnerService {

  private _httpHeaders: any;

  apiUrl: string = environment.apiUrl + "channelPartner"

  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  post(channelData: any) {
    return this.http.post(this.apiUrl, channelData, this._httpHeaders);
  }

  put(channelData: any) {
    return this.http.put(this.apiUrl, channelData, this._httpHeaders);
  }

  getById(id: any) {
    return this.http.get(this.apiUrl + '/getById/' + id, this._httpHeaders);
  }

  getAll(page: any, size: any) {
    return this.http.get(this.apiUrl + '?page=' + page + '&size=' + size, this._httpHeaders);
  }

  uploadImage(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.apiUrl + '/uploadImages', formData, this._httpHeaders)
  }

  searchByName(name: string) {
    return this.http.put(this.apiUrl + '/searchByName?page=0&size=50', name, this._httpHeaders);
  }

  updateReraAndImages(channelData: any) {
    return this.http.put(this.apiUrl + '/updateReraAndImages', channelData, this._httpHeaders);
  }

}
