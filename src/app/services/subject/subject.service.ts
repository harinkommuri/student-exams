import { Injectable } from '@angular/core';

import { HttpService } from "../http/http.service";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {
  subjects = new BehaviorSubject(1);
  //
  constructor(public http: HttpService) { }

  //

}
