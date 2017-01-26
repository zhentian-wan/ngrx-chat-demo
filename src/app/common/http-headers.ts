
import {Headers} from "@angular/http";
export function xhrHeaders(userId: number) {
  const headers = new Headers();
  headers.append('USERID', userId.toString());
  headers.append('Content-Type', 'application/json; charset=utf-8');

  return {headers};
}
