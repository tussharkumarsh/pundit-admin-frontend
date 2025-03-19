// Obtener account_id: https://www.googleapis.com/admin/directory/v1/users/liz@example.com (https://developers.google.com/admin-sdk/directory/v1/guides/manage-users)
// Google Scope: https://developers.google.com/identity/protocols/oauth2/scopes#openid_connect
// https://developers.google.com/gmail/api/v1/reference/users/messages/list#javascript
//https://stackoverflow.com/questions/58605719/how-to-get-profile-info-google-photo-library-api
// https://github.com/HaithemMosbahi/ngx-avatar/issues/51
//https://stackoverflow.com/questions/46349746/is-there-any-way-that-i-can-retrieve-account-id-from-google-contact-api-v3-to-ma
// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
// Environment
import { environment } from 'src/environments/environment';
// Models
// Constants
const API_URL: string = environment.GAPI_URL;

// import * as base64 from "base-64";

// import * as parseMessage from 'gmail-api-parse-message';

import { ParseGmailApi, IEmail } from 'gmail-api-parse-message-ts';
import { MAT_COLORS } from 'src/app/module/gmail/config/constants';
import { MessagesList } from 'src/app/module/gmail/models/messages-list.model';


@Injectable({
  providedIn: 'root'
})
export class GmailService {
  constructor(private http: HttpClient) {}

  getMessages(
    userId: string,
    authtoken: string,
    limit: number = 10
  ): Observable<any> {
    return this.http
      .get<MessagesList>(
        // `${API_URL}/${userId}/messages?maxResults=${limit}&labelIds=CATEGORY_UPDATES&labelIds=UNREAD&labelIds=INBOX`, // &q=category:primary
        `${API_URL}/${userId}/messages?q=category:primary&maxResults=${limit}`, // &q=category:primary
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${authtoken}`
          })
        }
      )
      .pipe(
        switchMap((res) => {
          let requests: any[] = [];
          const results = res.messages;
          results.forEach((item, index) => {
            requests.push(
              this.getMessageById(userId, authtoken, item.id, index)
            );
          });
          return forkJoin(requests); // [{ message, subject}, { message, subject}, { message, subject}, { message, subject}]
        })
      );
  }

  getSentMessages(
    userId: string,
    authtoken: string,
    limit: number = 10
  ): Observable<any> {
    return this.http
      .get<MessagesList>(
        `${API_URL}/${userId}/messages?maxResults=${limit}&labelIds=SENT`, // &q=category:primary
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${authtoken}`
          })
        }
      )
      .pipe(
        switchMap((res) => {
          let requests: any[] = [];
          const results = res.messages;
          results.forEach((item: any, index: any) => {
            requests.push(
              this.getMessageById(userId, authtoken, item.id, index)
            );
          });
          return forkJoin(requests); // [{ message, subject}, { message, subject}, { message, subject}, { message, subject}]
        })
      );
  }

  getTrashMessages(
    userId: string,
    authtoken: string,
    limit: number = 10
  ): Observable<any> {
    return this.http
      .get<MessagesList>(
        `${API_URL}/${userId}/messages?maxResults=${limit}&labelIds=TRASH`, // &q=category:primary
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${authtoken}`
          })
        }
      )
      .pipe(
        switchMap((res) => {
          let requests: any[] = [];
          const results = res.messages;
          results.forEach((item: any, index: any) => {
            requests.push(
              this.getMessageById(userId, authtoken, item.id, index)
            );
          });
          return forkJoin(requests); // [{ message, subject}, { message, subject}, { message, subject}, { message, subject}]
        })
      );
  }

  getSpamMessages(
    userId: string,
    authtoken: string,
    limit: number = 10
  ): Observable<any> {
    return this.http
      .get<MessagesList>(
        `${API_URL}/${userId}/messages?maxResults=${limit}&labelIds=SPAM`, // &q=category:primary
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${authtoken}`
          })
        }
      )
      .pipe(
        switchMap((res) => {
          let requests: any[] = [];
          const results = res.messages;
          results.forEach((item: any, index: any) => {
            requests.push(
              this.getMessageById(userId, authtoken, item.id, index)
            );
          });
          return forkJoin(requests); // [{ message, subject}, { message, subject}, { message, subject}, { message, subject}]
        })
      );
  }

  getCategoryUpdateMessages(
    userId: string,
    authtoken: string,
    limit: number = 10
  ): Observable<any> {
    return this.http
      .get<MessagesList>(
        `${API_URL}/${userId}/messages?maxResults=${limit}&labelIds=CATEGORY_UPDATES`, // &q=category:primary
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${authtoken}`
          })
        }
      )
      .pipe(
        switchMap((res) => {
          let requests: any[] = [];
          const results = res.messages;
          results.forEach((item: any, index: any) => {
            requests.push(
              this.getMessageById(userId, authtoken, item.id, index)
            );
          });
          return forkJoin(requests); // [{ message, subject}, { message, subject}, { message, subject}, { message, subject}]
        })
      );
  }

  getCategoryPramotionsMessages(
    userId: string,
    authtoken: string,
    limit: number = 10
  ): Observable<any> {
    return this.http
      .get<MessagesList>(
        `${API_URL}/${userId}/messages?maxResults=${limit}&labelIds=CATEGORY_PROMOTIONS`, // &q=category:primary
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${authtoken}`
          })
        }
      )
      .pipe(
        switchMap((res) => {
          let requests: any[] = [];
          const results = res.messages;
          results.forEach((item: any, index: any) => {
            requests.push(
              this.getMessageById(userId, authtoken, item.id, index)
            );
          });
          return forkJoin(requests); // [{ message, subject}, { message, subject}, { message, subject}, { message, subject}]
        })
      );
  }

  getMessageById(userId: string, authToken: string, id: string, index: number) {
    return this.http
      .get(`${API_URL}/${userId}/messages/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${authToken}`
        })
      })
      .pipe(
        map((res: any) => {
          let headers = res.payload.headers;
          let body = '';

          let filtered = headers.filter((item: any) => {
            return (
              item.name === 'From' ||
              item.name === 'Subject' ||
              item.name === 'Date'
            );
          });
          filtered = this.formatMessageResponse(filtered, 'name', index);

          //filtered.date = new Date(filtered.date);

          return {
            ...filtered,
            id: res.id,
            detail: res.snippet,
          };
        })
      );
  }

  getMailById(userId: string, authToken: string, id: string, index: number) {
    return this.http
      .get(`${API_URL}/${userId}/messages/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${authToken}`
        })
      })
      .pipe(
        map((res: any) => {

          const parse = new ParseGmailApi();
          const body : IEmail = parse.parseMessage(res);  // returns IEmail object
          console.log(body);  // see IEmail below
          // if(res.payload.mimeType === "multipart/alternative"){
          //   console.log('Part 1');
          //   console.log(res.payload.parts);
          // } else {
          //   console.log('Part 2');
          //   body = base64.decode(res.payload.body.data);
          // }



          // var parsedMessage = parseMessage(res);
          // console.log(parsedMessage);
          // let headers = res.payload.headers;
          // let body = '';
          // debugger

          // if(res?.payload?.body?.data){
          //   body = base64.decode(res.payload.body.data);
          // }

          // let filtered = headers.filter((item) => {
          //   return (
          //     item.name === 'From' ||
          //     item.name === 'Subject' ||
          //     item.name === 'Date'
          //   );
          // });
          // filtered = this.formatMessageResponse(filtered, 'name', index);

          // //filtered.date = new Date(filtered.date);

          return body;
        })
      );
  }


  getProfile(userId: string, authtoken: string) {
    return this.http.get(`${API_URL}/${userId}/profile`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
  }

  // este sirve
  getUserInfo(authtoken: string) {
    return this.http.get(`https://www.googleapis.com//userinfo/v2/me`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
  }

  getPublicPhoto(authtoken: string) {
    return this.http.get(
      `https://people.googleapis.com/v1/people/102664400979121925528?personFields=names%2Cphotos`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${authtoken}`
        })
      }
    );
  }

  formatMessageResponse(array: any, key: any, index: any) {
    let res = array.reduce((obj: any, item: any) => {
      return {
        ...obj,
        [item[key].toLowerCase()]: item.value
      };
    }, {});

    const nameAndEmail = this.getNameAndEmail(res.from);
    const imageParams = this.getImageParams(nameAndEmail.name, index);

    return {
      ...res,
      ...nameAndEmail,
      image_params: imageParams
    };
  }

  /*
   create(authtoken: string): Observable<any> {
        return this.httpClient.post(this.API_URL,{}, {
          headers: new HttpHeaders({
                Authorization: `Bearer ${authtoken}`
            })
        });
    }
   */

  getNameAndEmail(value: string) {
    const temp_index = value.indexOf('<');

    let name, email;
    if (temp_index >= 0) {
      name = value.substring(0, temp_index - 1);
      name = name.replace(/\"/g, '');
      email = value.substring(temp_index + 1, value.length);
      email = email.replace(/>/g, '');
    } else {
      let index = value.indexOf('@');
      if (index >= 0) name = value.substring(0, index);
      else name = 'Unknown';
      email = value;
    }

    return {
      name,
      email
    };
  }

  private getImageParams(name: string, index: number) {
    name = name.replace(/[\|'\(\)]+/g, '');
    name = name.replace(/\s{2,}/g, ' ');
    const names = name.split(' ', 2);
    const length = names.length;
    index = index % MAT_COLORS.length;

    let letters;
    if (length === 1) letters = names[0];
    else if (length === 2) letters = `${names[0]} ${names[1]}`;
    else letters = 'U';

    return `&name=${letters}&length=${length}&background=${MAT_COLORS[index]}`;
  }
}
