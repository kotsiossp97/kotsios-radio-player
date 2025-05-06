import React, { createContext, useEffect, useReducer } from "react";
import {
  IRadioAppAction,
  IRadioAppState,
  radioAppReducer,
} from "../reducers/RadioAppReducer";

interface IRadioAppContext {
  state: IRadioAppState;
  radioAppDispatcher: React.Dispatch<IRadioAppAction>;
}

const radioAppContext = createContext({} as IRadioAppContext);

interface IRadioAppContextProviderProps extends React.PropsWithChildren {
  initialState?: Partial<IRadioAppState>;
}

export const RadioAppContextProvider: React.FC<
  IRadioAppContextProviderProps
> = (props) => {
  const { children, initialState } = props;

  const [state, dispatcher] = useReducer(radioAppReducer, {
    ...initialState,
  } as IRadioAppState);

  useEffect(() => {
    const metadata = state.currentMetadata;
    if (!metadata) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: metadata?.title || "Unknown Song",
      artist:
        metadata?.artist || state.currentRadioStation?.name || "Unknown Artist",
      album: metadata?.album,
      artwork: [
        {
          src: metadata?.picture || state.currentRadioStation?.imageUrl || "",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });
  }, [state.currentMetadata, state.currentRadioStation]);
  return (
    <radioAppContext.Provider value={{ state, radioAppDispatcher: dispatcher }}>
      {children}
    </radioAppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRadioAppContext = (): IRadioAppContext => {
  const context = React.useContext(radioAppContext);
  if (!context) {
    throw new Error(
      "useRadioAppContext must be used within a RadioAppProvider",
    );
  }
  return context;
};
