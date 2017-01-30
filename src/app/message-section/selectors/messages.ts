import {MessageVM} from "../model/message-vm.interface";
import {AppState} from "../../store/application-state";

export const messageSelector = (state: AppState): MessageVM[] => {
  const {currentSelectedID} = state.uiState;
  if (!currentSelectedID) {
    return [];
  }
  const messageIds = state.storeData.threads[currentSelectedID].messageIds;
  const messages = messageIds.map(id => state.storeData.messages[id]);
  return messages.map((message) => mapMessageToMessageVM(message, state));
};

const mapMessageToMessageVM = (message, state): MessageVM => {
  return {
    id: message.id,
    text: message.text,
    participantName: (state.storeData.participants[message.participantId].name || ''),
    timestamp: message.timestamp
  }
};
