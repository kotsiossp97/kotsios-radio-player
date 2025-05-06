export enum EPlayerState {
  LOADING = "LOADING",
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
  ERROR = "ERROR",
}

export enum EPlayerVisualState {
  HIDDEN = "HIDDEN",
  MINIMIZED = "MINIMIZED",
  MAXIMIZED = "MAXIMIZED",
}

export interface IPlayerState {
  playState: EPlayerState;
  visualState: EPlayerVisualState;
  volume: number;
  currentTime: number;
  duration: number;
}
