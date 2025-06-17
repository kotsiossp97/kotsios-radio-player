import { useEffect, useState } from "react";
import { useRadioAppContext } from "../context/RadioContext";
import IcecastMetadataPlayer, { IcyMetadata } from "icecast-metadata-player";
import { ERadioAppActions } from "../reducers/RadioAppReducer";
import { fetchCurrentRythmosData } from "../utils/rythmos";
import { EPlayerState } from "../types/player";
import { handleGreekDecode } from "../utils/encoding";

const useIcecastStream = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
): IcecastMetadataPlayer | null => {
  const { state, radioAppDispatcher } = useRadioAppContext();
  const [radioPlayer, setRadioPlayer] = useState<IcecastMetadataPlayer | null>(
    null,
  );
  useEffect(() => {
    const currentStation = state.currentRadioStation;
    if (!currentStation || !audioRef.current) return;

    radioAppDispatcher({
      type: ERadioAppActions.SET_STATE,
      payload: {
        currentMetadata: undefined,
      },
    });

    // Fetch initial metadata if rythmos station
    fetchCurrentRythmosData(currentStation).then((data) => {
      if (!data) return;
      radioAppDispatcher({
        type: ERadioAppActions.SET_STATE,
        payload: {
          currentMetadata: {
            title: data?.track_name,
            artist: data?.artist,
            picture: data?.photo_url,
          },
        },
      });
    });

    const player = new IcecastMetadataPlayer(currentStation.streamUrl, {
      metadataTypes: ["icy", "ogg"],
      playbackMethod: "html5",
      // playbackMethod: undefined,
      audioElement: audioRef.current,
      onMetadata: (metadata: IcyMetadata) => {
        if (currentStation.rythmosWebSocket) return;
        if (metadata?.StreamUrl) {
          const url = decodeURIComponent(metadata?.StreamUrl);
          const params = new URLSearchParams(url);
          radioAppDispatcher({
            type: ERadioAppActions.SET_STATE,
            payload: {
              currentMetadata: {
                title: handleGreekDecode(
                  params.get("title") ||
                    metadata?.StreamTitle ||
                    "Unknown Song",
                ),
                artist: handleGreekDecode(
                  params.get("artist") || "Unknown Artist",
                ),
                album: handleGreekDecode(
                  params.get("album") || "Unknown Album",
                ),
                duration: params.get("duration") ?? undefined,
                songtype: params.get("songtype") ?? undefined,
                overlay: params.get("overlay") ?? undefined,
                buycd: params.get("buycd") ?? undefined,
                website: params.get("website") ?? undefined,
                picture: params.get("picture") ?? undefined,
              },
            },
          });
          return;
        }
        radioAppDispatcher({
          type: ERadioAppActions.SET_STATE,
          payload: {
            currentMetadata: {
              title: handleGreekDecode(metadata?.StreamTitle || "Unknown Song"),
            },
          },
        });
      },
    });
    // console.log("🚀 ~ useEffect ~ player:", player.)
    setRadioPlayer(player);
    if (state.playerState.playState === EPlayerState.PLAYING) {
      console.log("🚀 ~ useEffect ~ player:", player.audioElement);
      player.audioElement.play();
    }

    return () => {
      player.detachAudioElement();
    };
  }, [state.currentRadioStation, audioRef, radioAppDispatcher]);

  // useEffect(() => {
  //   if (!radioPlayer) return;
  //   console.log("🚀 ~ useEffect ~ radioPlayer:", radioPlayer)
  //   if (state.playerState.playState === EPlayerState.PLAYING) {
  //     radioPlayer.audioElement.play();
  //   }
  // }, [radioPlayer, state.playerState.playState]);
  return radioPlayer;
};

export default useIcecastStream;
