import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxDatatableService {
  hero_pages: any;
  total_count;

  json_url_data: any;
  private _httpHeaders: any;
  apiUrl = 'test';

  constructor(private http: HttpClient) {

    this._httpHeaders = {
      headers: new HttpHeaders({
        // 'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken,
        "Access-Control-Allow-Origin": "*",
        'X-Shopify-Access-Token': 'test',
        // "Content-Type": "application/liquid"
      })
    };


    this.hero_pages = [
      {
        'id': '05fb32e7-9fae-4879-8379-d037937fdc24',
        'status': 'ACTIVE',
        'title_line1': 'MAKING FANTASY FOOTBALL',
        'title_line2': 'A REAL THING',
        'type': 'FCF',
        'order_number': 1
      }, {
        'id': '05fb32e7-9fae-4879-8379-d037937fdc24',
        'status': 'ACTIVE',
        'title_line1': 'MAKING FANTASY FOOTBALL',
        'title_line2': 'A REAL THING',
        'type': 'FCF1',
        'order_number': 2
      }, {
        'id': '05fb32e7-9fae-4879-8379-d037937fdc24',
        'status': 'ACTIVE',
        'title_line1': 'MAKING FANTASY FOOTBALL',
        'title_line2': 'A REAL THING',
        'type': 'FCF2',
        'order_number': 3
      }, {
        'id': '05fb32e7-9fae-4879-8379-d037937fdc24',
        'status': 'ACTIVE',
        'title_line1': 'MAKING FANTASY FOOTBALL',
        'title_line2': 'A REAL THING',
        'type': 'FCF3',
        'order_number': 4
      }
    ];

    this.total_count = this.hero_pages.length;
  }


  getByURL() {
    return this.http.get(this.apiUrl, this._httpHeaders);
  }
}  