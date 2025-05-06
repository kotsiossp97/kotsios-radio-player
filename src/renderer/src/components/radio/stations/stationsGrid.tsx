import React, { useState } from "react";
import { IRadioStation } from "../../../types/radio";
import { Flex, Stack } from "@chakra-ui/react";
import StationCard from "./StationCard";
import StationsPagination from "./Pagination";

interface IStationsGridProps {
  allStations: IRadioStation[];
  pageSize: number;
}

const StationsGrid: React.FC<IStationsGridProps> = (props) => {
  const { allStations, pageSize } = props;
  const totalPages = Math.ceil(allStations?.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const startRange = (currentPage - 1) * pageSize;
  const endRange = startRange + pageSize;
  const visibleStations = allStations?.slice(startRange, endRange);
  return (
    <Stack align={"center"} padding={5} background={"gray.subtle"} paddingBottom={"110px"}>
      <Flex gap={4} wrap={"wrap"} justifyContent={"center"}>
        {visibleStations?.map((station, i) => (
          <StationCard key={i} station={station} />
        ))}
      </Flex>
      <StationsPagination
        totalPages={totalPages}
        pageSize={pageSize}
        page={currentPage}
        onPageChange={setCurrentPage}
      />
    </Stack>
  );
};

export default StationsGrid;
