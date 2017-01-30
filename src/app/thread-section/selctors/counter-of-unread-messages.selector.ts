import {AppState} from "../../store/application-state";
import {Thread} from "../../../../shared/model/thread.interface";
import {values} from 'lodash';

export const unreadMessageCounterSelector = (state: AppState): number => {
  const currentUserId: number = state.uiState.userId;

  if (!currentUserId) {
    return 0;
  }

  return values<Thread>(state.storeData.threads)
    .reduce(
      (acc: number, thread) => acc + (thread.participants[currentUserId] || 0)
      , 0);
}
