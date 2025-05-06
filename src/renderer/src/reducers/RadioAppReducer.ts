import { EPlayerState, IPlayerState } from "../types/player";
import { IRadioStation, IStreamMetadata } from "../types/radio";

export interface IRadioAppState {
  radioStations: IRadioStation[];
  currentRadioStation?: IRadioStation;
  currentMetadata?: IStreamMetadata;
  playerState: IPlayerState;
}

export enum ERadioAppActions {
  SET_STATE = "SET_STATE",
  SET_PLAYER_STATE = "SET_PLAYER_STATE",
  TOGGLE_PLAYER_STATE = "TOGGLE_PLAYER_STATE",
}

export interface IRadioAppAction {
  type: ERadioAppActions;
  payload?: Partial<IRadioAppState | IPlayerState>;
}

export const radioAppReducer = (
  state: IRadioAppState,
  action: IRadioAppAction,
): IRadioAppState => {
  switch (action.type) {
    case ERadioAppActions.SET_STATE:
      return { ...state, ...action.payload };
    case ERadioAppActions.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: {
          ...state.playerState,
          ...action.payload,
        },
      };
    case ERadioAppActions.TOGGLE_PLAYER_STATE:
      return {
        ...state,
        playerState: {
          ...state.playerState,

          playState:
            state.playerState.playState === EPlayerState.PLAYING
              ? EPlayerState.PAUSED
              : EPlayerState.PLAYING,
        },
      };
    default:
      return state;
  }
};
