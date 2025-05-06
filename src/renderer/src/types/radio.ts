export interface IRadioStation {
  name: string;
  streamUrl: string;
  imageUrl?: string;
  websiteUrl?: string;
  streamSlug?: string;
  rythmosWebSocket?: string;
}

export interface IStreamMetadata {
  artist?: string;
  title?: string;
  album?: string;
  duration?: string;
  songtype?: string;
  overlay?: string;
  buycd?: string;
  website?: string;
  picture?: string;
}
