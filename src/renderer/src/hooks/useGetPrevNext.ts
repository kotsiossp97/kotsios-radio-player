import { useRadioAppContext } from "../context/RadioContext";
import { IRadioStation } from "../types/radio";

const useGetPrevNext = (): {
  prev?: IRadioStation;
  next?: IRadioStation;
} => {
  const { state } = useRadioAppContext();

  const currentStation = state.currentRadioStation;
  if (!currentStation) return { prev: undefined, next: undefined };

  const currentIndex = state.radioStations.findIndex(
    (s) => s.streamUrl === currentStation.streamUrl,
  );

  const prevIndex = currentIndex - 1 < 0 ? undefined : currentIndex - 1;
  const nextIndex =
    currentIndex + 1 >= state.radioStations.length
      ? undefined
      : currentIndex + 1;

  const prevStation =
    prevIndex !== undefined ? state.radioStations?.[prevIndex] : undefined;
  const nextStation =
    nextIndex !== undefined ? state.radioStations?.[nextIndex] : undefined;

  return {
    prev: prevStation,
    next: nextStation,
  };
};

export default useGetPrevNext;
