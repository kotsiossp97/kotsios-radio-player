import React from "react";
import { useRadioAppContext } from "../../../context/RadioContext";
import Volume from "./Volume";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { EPlayerState } from "../../../types/player";
import {
  LuMusic,
  LuPause,
  LuPlay,
  LuSkipBack,
  LuSkipForward,
  LuUserRound,
} from "react-icons/lu";
import { ERadioAppActions } from "../../../reducers/RadioAppReducer";
import useGetPrevNext from "../../../hooks/useGetPrevNext";

const PlayerMini: React.FC = () => {
  const { state, radioAppDispatcher } = useRadioAppContext();
  const { prev, next } = useGetPrevNext();

  const albumArt =
    state.currentMetadata?.picture || state.currentRadioStation?.imageUrl;
  return (
    <Flex
      w="100%"
      h={"100px"}
      background={"blackAlpha.700"}
      position={"fixed"}
      bottom={0}
      alignItems={"center"}
      p={5}
    >
      <Flex flex={1} w={"100%"} alignItems={"center"} gap={3}>
        <Image
          src={albumArt}
          alt=""
          h={"60px"}
          aspectRatio={1}
          objectFit={"contain"}
          overflow={"hidden"}
        />
        <Box display={"flex"}>
          {prev && (
            <Button
              variant={"ghost"}
              onClick={() => {
                radioAppDispatcher({
                  type: ERadioAppActions.SET_STATE,
                  payload: {
                    currentRadioStation: prev,
                  },
                });
              }}
            >
              <LuSkipBack size={30} />
            </Button>
          )}
          <Button
            variant={"ghost"}
            onClick={() => {
              radioAppDispatcher({
                type: ERadioAppActions.TOGGLE_PLAYER_STATE,
              });
            }}
          >
            {state?.playerState.playState === EPlayerState.PLAYING ? (
              <LuPause size={30} />
            ) : (
              <LuPlay />
            )}
          </Button>
          {next && (
            <Button
              variant={"ghost"}
              onClick={() => {
                radioAppDispatcher({
                  type: ERadioAppActions.SET_STATE,
                  payload: {
                    currentRadioStation: next,
                  },
                });
              }}
            >
              <LuSkipForward size={30} />
            </Button>
          )}
        </Box>

        <Box>
          <Text fontSize={"2xl"} fontWeight={"medium"}>
            {state?.currentRadioStation?.name}
          </Text>

          <div>
            {!state?.currentMetadata && (
              <Text fontSize={"sm"} fontStyle={"italic"}>
                No information available
              </Text>
            )}
            {state.currentMetadata?.title && (
              <Text
                fontSize={"sm"}
                fontStyle={"italic"}
                display={"flex"}
                gap={2}
                alignItems="center"
              >
                <LuMusic /> {state.currentMetadata?.title}
              </Text>
            )}
            {state.currentMetadata?.artist && (
              <Text
                fontSize={"sm"}
                fontStyle={"italic"}
                display={"flex"}
                gap={2}
                alignItems="center"
              >
                <LuUserRound /> {state.currentMetadata?.artist}
              </Text>
            )}
          </div>
        </Box>
      </Flex>

      <Volume />
    </Flex>
  );
};

export default PlayerMini;
