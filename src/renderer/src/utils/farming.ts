import { IRadioStation } from "../types/radio";

export const createFarmingRadiosXML = (allRadios: IRadioStation[]): string => {
  const radiosXML = `<?xml version="1.0" encoding="utf-8" standalone="no"?>
<streamingInternetRadios>
${allRadios
  .map(
    (radio) =>
      `    <streamingInternetRadio href="${radio.streamUrl}" />   <!-- ${radio.name} -->`,
  )
  .join("\n")}
</streamingInternetRadios>`;

  // Create a blob from the XML string
  const blob = new Blob([radiosXML], { type: "text/xml" });
  const file = new File([blob], "streamingInternetRadios.xml", {
    type: "text/xml",
  });
  const url = URL.createObjectURL(file);

  return url;
};
