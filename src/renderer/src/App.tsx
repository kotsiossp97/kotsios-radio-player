import { useEffect } from "react";
import { useRadioAppContext } from "./context/RadioContext";
import { ERadioAppActions } from "./reducers/RadioAppReducer";
import StationsGrid from "./components/radio/stations/stationsGrid";
import RadioPlayer from "./components/radio/player/RadioPlayer";
import Actions from "./components/radio/actions/Actions";

function App(): React.JSX.Element {
  const {
    radioAppDispatcher,
    state: { radioStations },
  } = useRadioAppContext();

  useEffect(() => {
    const getStations = async (): Promise<void> => {
      const stations = await window.electron.ipcRenderer.invoke(
        "db-query",
        "SELECT * FROM RADIO_STATIONS",
      );

      radioAppDispatcher({
        type: ERadioAppActions.SET_STATE,
        payload: { radioStations: stations },
      });
    };

    getStations();
  }, []);

  return (
    <>
      <Actions />
      <StationsGrid allStations={radioStations} pageSize={8} />
      <RadioPlayer />
    </>
  );
}

export default App;
