import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AllUserData} from "../../../shared/to/all-user-data";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {SEND_NEW_MESSAGE_PAYLOAD} from "../store/actions";
import {Message} from "../../../shared/model/message.interface";
import {xhrHeaders} from "../common/http-headers";

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }

  loadUserThreads(userId: number): Observable<AllUserData> {
    return this.http.get('/api/threads', xhrHeaders(userId))
      .map((res: Response) => res.json())
  }

  saveNewMessage(payload: SEND_NEW_MESSAGE_PAYLOAD): Observable<any> {
    return this.http.post(`/api/threads/${payload.threadId}`,
      JSON.stringify(payload),
      xhrHeaders(payload.participantId)
    );
  }

  loadNewMessages(userId: number): Observable<any> {
    return this.http.post(`/api/notifications/messages`, null, xhrHeaders(userId))
      .map(res => res.json().payload);
  }

  markUnreadMessage(userId: number, threadId: number): Observable<any> {
    return this.http.patch(`/api/threads/${threadId}`, {read: true, id: userId.toString()}, xhrHeaders(userId));
  }
}
