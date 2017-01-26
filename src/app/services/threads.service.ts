import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AllUserData} from "../../../shared/to/all-user-data";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }

  loadUserThreads(userId: number): Observable<AllUserData> {

    const headers = new Headers();
    headers.append('USERID', userId.toString());
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.get('/api/threads', {headers})
      .map((res: Response) => res.json())
  }

}
