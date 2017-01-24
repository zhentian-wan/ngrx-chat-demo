
export interface UiState {
  userId: number;
  currentSelectedID: number;
}

export const INITIAL_UI_STATE: UiState = {
  userId: 1,
  currentSelectedID: undefined
};
