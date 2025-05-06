import { IRadioStation } from "../types/radio";

export interface IRythmosSongData {
  artist: string;
  track_name: string;
  is_song: boolean;
  photo_url: string;
}

export const fetchCurrentRythmosData = async (
  radioStation: IRadioStation,
): Promise<IRythmosSongData | null> => {
  if (!radioStation.streamSlug || !radioStation.rythmosWebSocket) return null;

  try {
    const response = await fetch(
      `https://api.soundis.gr/api/stream-homepage/${radioStation.streamSlug}`,
    );

    const data = await response.json();

    return data?.current_track as IRythmosSongData;
  } catch (error) {
    console.error("Error fetching Rythmos data:", error);
    return null;
  }
};
