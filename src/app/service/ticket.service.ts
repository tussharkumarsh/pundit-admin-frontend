import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class TicketService {
  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "ticket"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  post(callData:any) {
    return this.http.post(this.apiUrl + "/createCall", callData, this._httpHeaders);
  }

  put(callData:any) {
    return this.http.put(this.apiUrl, callData, this._httpHeaders);
  }

  raiseTicket(subject:any, mailFrom:any, eid:any) {
    let ticketObj: any = {
      'subject' : subject,
      'from': mailFrom,
      'status':"OPEN",
      'eid': eid
    }
    return this.http.post(this.apiUrl + '/raiseTicket', ticketObj, this._httpHeaders);
  }

  updateraiseTicket(mailId:any) {
    return this.http.put(this.apiUrl + '/' + mailId + '/status/CLOSED', '', this._httpHeaders);
  }

  getRequestNumberByemailSubject(emailSubject:any) {
    return this.http.get(this.apiUrl + '/emailSubject/?emailSubject=' + emailSubject, this._httpHeaders);
  }

  getByRequestNumber(requestNumber:any) {
    return this.http.get(this.apiUrl + '/getByRequestNumber/' + requestNumber, this._httpHeaders);
  }

  getAll() {
    return this.http.get(this.apiUrl + '/?page=1&size=2000', this._httpHeaders);
  }

  getByEmailUniqueId(emailUniqueId:any) {
    return this.http.get(this.apiUrl + '/getByEmailUniqueId/' + emailUniqueId, this._httpHeaders);
  }
}
