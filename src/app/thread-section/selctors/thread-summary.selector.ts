import {AppState} from "../../store/application-state";
import {Thread} from "../../../../shared/model/thread.interface";
import {ThreadSummary} from "../model/threadSummary.interface";
import {last, values, keys, memoize} from 'lodash';
import {createSelector} from 'reselect';
import {Message} from "../../../../shared/model/message.interface";
import {Participant} from "../../../../shared/model/paticipant.interface";

export const mapStateToThreadSummarySelector = createSelector(
  _getThreads,
  _getMessages,
  _getParticipant,
  _getUserId,
  _getThreadId,
  _mapThreadsToThreadSummaries
);

function _mapThreadsToThreadSummaries(
  threads: Thread[],
  messages: {[key: number]: Message},
  participants: {[key: number]: Participant},
  userId: number, threadId: number
): ThreadSummary[] {
  return threads.map((thread) =>
    _mapThreadToThreadSummary(
      thread, messages, participants, userId, threadId
    ));
}

const _mapThreadToThreadSummary = memoize((
  thread: Thread,
  messages: {[key: number]: Message},
  participants: {[key: number]: Participant},
  userId: number, currentSelectedID: number
): ThreadSummary => {
  const names = _mapThreadToParticipantNames(thread, participants);
  const lastMessage = _mapThreadToLastMessage(thread, messages);
  return _composeThreadSummary(thread, names, lastMessage, currentSelectedID, userId);
}, (thread, msgs, participants, uid, tid) => {
    return `${thread.id}-${uid}-${tid}`
});

function _composeThreadSummary(
  thread: Thread, names: string, lastMessage: Message,
  currentSelectedID: number, userId: number
): ThreadSummary {
  return {
    id: thread.id,
    participants: names,
    lastMessage: lastMessage.text,
    timestamp: lastMessage.timestamp,
    read: thread.id === currentSelectedID || thread.participants[userId] === 0
  };
}

function _mapThreadToLastMessage(thread: Thread, messages): Message {
  const lastMessageId: number = last(thread.messageIds);
  return messages[lastMessageId];
}

function _mapThreadToParticipantNames(thread: Thread, participants): string {
  return keys(thread.participants)
    .map(participantId => participants[participantId].name)
    .join(', ');
}

function _getMessages(state: AppState): {[key: number]: Message}{
  return state.storeData.messages;
}

function _getParticipant(state: AppState): {[key: number]: Participant} {
  return state.storeData.participants;
}

function _getThreads(state: AppState): Thread[] {
  return values<Thread>(state.storeData.threads);
}

function _getUserId(state: AppState): number {
  return state.uiState.userId;
}

function _getThreadId(state: AppState): number {
  return state.uiState.currentSelectedID;
}
