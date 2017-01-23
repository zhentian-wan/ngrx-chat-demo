
import * as _ from 'lodash';
import {Thread} from "../../../shared/model/thread.interface";
import {dbThreads} from "../db.data";

export function findDbThreadsPerUser(participantId:number) {

  const allThreads: Thread[] = _.values<Thread>(dbThreads);


  return _.filter(allThreads, thread =>
    _.includes( _.keys(thread.participants), participantId.toString() )
  )

}
