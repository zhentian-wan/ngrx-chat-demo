
import {Application} from 'express';
import {dbThreads} from "../db.data";

import {values, find} from 'lodash';
import {Thread} from "../../../shared/model/thread.interface";


export function apiUpdateThread(app: Application) {
  app.route(`/api/threads/:id`).patch((req, res) => {
    const participantId: number = parseInt(req.headers['userid'], 10);
    const threadId: number = parseInt(req.params['id'], 10);
    const updatedProps = req.body;
    const allThreads: Thread[] = <any>values(dbThreads);
    const thread = find(allThreads, thread => thread.id === threadId);

    if(updatedProps.hasOwnProperty('read')) {
      thread.participants[participantId] = 0;
    }

    res.status(200).send();
  })
}
