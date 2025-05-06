import React from "react";
import { useRadioAppContext } from "../../../context/RadioContext";
import { Button, Popover, Slider } from "@chakra-ui/react";
import { LuVolumeX, LuVolume1, LuVolume2 } from "react-icons/lu";
import { ERadioAppActions } from "../../../reducers/RadioAppReducer";

const Volume: React.FC = () => {
  const { state, radioAppDispatcher } = useRadioAppContext();
  const volume = state.playerState.volume;

  const volumeIcon = (): React.ReactElement => {
    switch (true) {
      case volume === 0:
        return <LuVolumeX />;
      case volume > 0 && volume <= 50:
        return <LuVolume1 />;
      case volume > 50 && volume <= 100:
        return <LuVolume2 />;
      default:
        return <LuVolume1 />;
    }
  };

  const marks = [
    { value: 0, label: "0%" },
    { value: 50, label: "50%" },
    { value: 100, label: "100%" },
  ];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="lg" variant={"ghost"}>
          {volumeIcon()}
        </Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content w={"auto"}>
          <Popover.Body>
            <Slider.Root
              height="200px"
              orientation="vertical"
              value={[volume]}
              colorPalette={"teal"}
              onValueChange={({ value }) => {
                radioAppDispatcher({
                  type: ERadioAppActions.SET_PLAYER_STATE,
                  payload: { volume: value[0] },
                });
              }}
            >
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
                <Slider.Marks marks={marks} />
              </Slider.Control>
            </Slider.Root>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default Volume;
