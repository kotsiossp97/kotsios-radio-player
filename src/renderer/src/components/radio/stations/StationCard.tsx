import React from "react";
import { Card, Image, Text } from "@chakra-ui/react";
import { IRadioStation } from "../../../types/radio";
import { useRadioAppContext } from "../../../context/RadioContext";
import { ERadioAppActions } from "../../../reducers/RadioAppReducer";

interface IStationCardProps {
  station: IRadioStation;
}

const StationCard: React.FC<IStationCardProps> = (props) => {
  const { station } = props;
  const { state, radioAppDispatcher } = useRadioAppContext();

  const handleRadioStationClick = (): void => {
    radioAppDispatcher({
      type: ERadioAppActions.SET_STATE,
      payload: { currentRadioStation: station },
    });
  };

  const isSelected = state.currentRadioStation?.name === station.name;

  return (
    <Card.Root
      flexBasis={"300px"}
      variant={"elevated"}
      _hover={{ scale: 1.05, cursor: "pointer" }}
      scale={isSelected ? 1.03 : 1}
      border={isSelected ? "2px solid" : ""}
      borderColor={isSelected ? "teal.400" : ""}
      onClick={handleRadioStationClick}
    >
      <Image
        src={station.imageUrl}
        alt={station.name}
        aspectRatio={1}
        objectFit={"contain"}
      />
      <Card.Body>
        <Text textStyle={"xl"} fontWeight={"medium"}>
          {station.name}
        </Text>
        {/* <Card.Title>{station.name}</Card.Title> */}
      </Card.Body>
    </Card.Root>
  );
};

export default StationCard;
