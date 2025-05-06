import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { LuDownload } from "react-icons/lu";
import { useRadioAppContext } from "../../../context/RadioContext";
import { createFarmingRadiosXML } from "../../../utils/farming";

const Actions: React.FC = () => {
  const { state } = useRadioAppContext();

  const onFSClick = (): void => {
    const xmlUrl = createFarmingRadiosXML(state.radioStations);
    const link = document.createElement("a");
    link.href = xmlUrl;
    link.hidden = true;
    link.download = "streamingInternetRadios.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(xmlUrl);
  };
  return (
    <Flex p={4} justifyContent={"flex-end"}>
      <Button variant={"subtle"} colorPalette={"teal"} onClick={onFSClick}>
        <LuDownload />
        FS XML
      </Button>
    </Flex>
  );
};

export default Actions;
