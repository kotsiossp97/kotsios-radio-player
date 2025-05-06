import React, { useEffect, useRef } from "react";
import PlayerMini from "./PlayerMini";
import useIcecastStream from "../../../hooks/useIcecastStream";
import useGetRythmosStation from "../../../hooks/useGetRythmosStation";
import { useRadioAppContext } from "../../../context/RadioContext";
import { ERadioAppActions } from "../../../reducers/RadioAppReducer";
import { EPlayerState } from "../../../types/player";
// import { Flex } from "@chakra-ui/react";

const RadioPlayer: React.FC = () => {
  const { state, radioAppDispatcher } = useRadioAppContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  const radioPlayer = useIcecastStream(audioRef);
  useGetRythmosStation();

  useEffect(() => {
    if (!audioRef.current) return;

    switch (state.playerState.playState) {
      case EPlayerState.PAUSED:
      case EPlayerState.STOPPED:
        navigator.mediaSession.playbackState = "paused";
        audioRef.current.pause();
        break;
      case EPlayerState.PLAYING:
        navigator.mediaSession.playbackState = "playing";
        audioRef.current?.play();
        break;
    }
  }, [state.playerState.playState, audioRef]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = state.playerState.volume / 100;
  }, [state.playerState.volume, radioPlayer]);

  return (
    <div>
      <PlayerMini />

      <audio
        ref={audioRef}
        onPlay={() => {
          radioAppDispatcher({
            type: ERadioAppActions.SET_PLAYER_STATE,
            payload: {
              playState: EPlayerState.PLAYING,
            },
          });
        }}
        onPause={() => {
          radioAppDispatcher({
            type: ERadioAppActions.SET_PLAYER_STATE,
            payload: {
              playState: EPlayerState.PAUSED,
            },
          });
        }}
        hidden
      ></audio>
    </div>
  );
};

export default RadioPlayer;
