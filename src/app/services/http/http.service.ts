import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  //
  constructor(public http: HttpClient) { }

  //
  get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url).toPromise().then(resolve).catch(reject);
    });
  }
}
