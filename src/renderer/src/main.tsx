import "./assets/main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { RadioAppContextProvider } from "./context/RadioContext";
import { EPlayerState, EPlayerVisualState } from "./types/player";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RadioAppContextProvider
        initialState={{
          radioStations: [],
          currentRadioStation: undefined,
          currentMetadata: undefined,
          playerState: {
            playState: EPlayerState.STOPPED,
            currentTime: 0,
            duration: 0,
            visualState: EPlayerVisualState.HIDDEN,
            volume: 80,
          },
        }}
      >
        <App />
      </RadioAppContextProvider>
    </Provider>
  </StrictMode>,
);
