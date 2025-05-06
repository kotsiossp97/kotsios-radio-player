import { useEffect } from "react";
import { useRadioAppContext } from "../context/RadioContext";
import { ERadioAppActions } from "../reducers/RadioAppReducer";

const subscribeToWS = {
  event: "pusher:subscribe",
  data: { auth: "", channel: "soundis-gr" },
};
const subShouts = {
  event: "pusher:subscribe",
  data: { auth: "", channel: "soundis-shouts" },
};

const useGetRythmosStation = (): void => {
  const {
    state: { currentRadioStation },
    radioAppDispatcher,
  } = useRadioAppContext();

  useEffect(() => {
    if (!currentRadioStation) return;
    if (!currentRadioStation.rythmosWebSocket) return;
    const ws = new WebSocket(currentRadioStation.rythmosWebSocket);
    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeToWS));
      ws.send(JSON.stringify(subShouts));
    };

    ws.onmessage = (event) => {
      const evData = JSON.parse(event.data);
      if (!evData.data) return;
      const chData = JSON.parse(evData.data);
      if (!chData) return;

      const data = chData?.data;
      if (data?.stream_slug !== currentRadioStation.streamSlug) return;
      if (data?.is_song === 0) return;

      radioAppDispatcher({
        type: ERadioAppActions.SET_STATE,
        payload: {
          currentMetadata: {
            title: data?.track?.track_name,
            artist: data?.track?.artist,
            picture: data?.track?.photo_url,
          },
        },
      });
    };

    return () => {
      ws.close();
    };
  }, [currentRadioStation, radioAppDispatcher]);
};

export default useGetRythmosStation;
