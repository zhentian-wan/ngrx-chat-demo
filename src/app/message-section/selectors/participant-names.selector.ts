
import {AppState} from "../../store/application-state";
import {keys} from 'lodash';

export const participantNamesSelector = (state: AppState): string => {
  const {currentSelectedID} = state.uiState;
  if (!currentSelectedID) {
    return "";
  }
  const participantIds = keys(
    state.storeData.threads[currentSelectedID].participants
  );
  return participantIds
    .map((pId) => state.storeData.participants[pId].name)
    .join(', ');
};
