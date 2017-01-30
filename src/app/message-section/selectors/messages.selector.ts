import {MessageVM} from "../model/message-vm.interface";
import {AppState} from "../../store/application-state";
import {Message} from "../../../../shared/model/message.interface";
import {Participant} from "../../../../shared/model/paticipant.interface";
import {createSelector} from 'reselect';
import {memoize} from 'lodash';

export const messageSelector = createSelector(
  _getMessagesFromCurrentThread,
  _getParticipants,
  _mapMessagesToMessageVM
);

function _getMessagesFromCurrentThread(state: AppState): Message[] {
  const {currentSelectedID} = state.uiState;
  if(!currentSelectedID) {
    return [];
  }
  const currentThread = state.storeData.threads[currentSelectedID];
  return currentThread.messageIds.map(msgId => state.storeData.messages[msgId])
}

function _getParticipants(state: AppState): {[key: number]: Participant} {
  return state.storeData.participants;
}

function _mapMessagesToMessageVM(messages: Message[] = [], participants: {[key: number]: Participant}) {
  return messages.map((message) => {
    const participantNames = participants[message.participantId].name || '';
    return _mapMessageToMessageVM(message, participantNames);
  });
}

const _mapMessageToMessageVM = memoize((message: Message, participantName: string): MessageVM => {
  return {
    id: message.id,
    text: message.text,
    participantName: participantName,
    timestamp: message.timestamp
  }
}, (message, participantName) => message.id + participantName);
