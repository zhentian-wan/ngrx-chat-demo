import {MessageVM} from "../model/message-vm.interface";
import {AppState} from "../../store/application-state";
import {Message} from "../../../../shared/model/message.interface";
import {Participant} from "../../../../shared/model/paticipant.interface";
import {createSelector} from 'reselect';
/*
export const messageSelector = (state: AppState): MessageVM[] => {
  const messages = _getMessagesFromCurrentThread(state);
  const participants = _getParticipants(state);
  return _mapMessagesToMessageVM(messages, participants);
};*/

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

function _mapMessagesToMessageVM(messages: Message[] = [], participants) {
  return messages.map((message) => _mapMessageToMessageVM(message, participants));
}

function _mapMessageToMessageVM(message: Message, participants: {[key: number]: Participant}): MessageVM {
  return {
    id: message.id,
    text: message.text,
    participantName: (participants[message.participantId].name || ''),
    timestamp: message.timestamp
  }
}
