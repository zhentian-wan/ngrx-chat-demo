import {AppState} from "../../store/application-state";
import {Thread} from "../../../../shared/model/thread.interface";
import {ThreadSummary} from "../model/threadSummary.interface";
import {last, values, keys} from 'lodash';

export const mapStateToThreadSummarySelector = (state: AppState): ThreadSummary[] => {
  const threads = values<Thread>(state.storeData.threads);
  return threads.map((thread) => mapThreadToThreadSummary(thread, state));
};

const mapThreadToThreadSummary = (thread: Thread, state: AppState): ThreadSummary => {
  const names: string = keys(thread.participants)
    .map(participantId => state.storeData.participants[participantId].name)
    .join(', ');
  const lastMessageId: number = last(thread.messageIds);
  const lastMessage = state.storeData.messages[lastMessageId];
  return {
    id: thread.id,
    participants: names,
    lastMessage: lastMessage.text,
    timestamp: lastMessage.timestamp,
    read: thread.id === state.uiState.currentSelectedID || thread.participants[state.uiState.userId] === 0
  };
};
