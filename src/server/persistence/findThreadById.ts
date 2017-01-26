import {dbThreads} from "../db.data";
import * as _ from 'lodash';
import {Thread} from "../../../shared/model/thread.interface";



export function findThreadById(threadId:number) {

  const threads: Thread[] = <any> _.values(dbThreads);

  return _.find(threads,thread => thread.id === threadId);
}
