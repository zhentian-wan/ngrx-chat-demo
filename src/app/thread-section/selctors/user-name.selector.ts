import {AppState} from "../../store/application-state";

export const userNameSelector = (state: AppState): string =>{
  const currentUserId = state.uiState.userId;
  const currentParticipant = state.storeData.participants[currentUserId];

  if (!currentParticipant) {
    return "";
  }

  return currentParticipant.name;
};
