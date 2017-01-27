
export interface UiState {
  userId: number;
  currentSelectedID: number;
  errorMsg?: string;
}

export const INITIAL_UI_STATE: UiState = {
  userId: undefined,
  currentSelectedID: undefined,
  errorMsg: null
};
