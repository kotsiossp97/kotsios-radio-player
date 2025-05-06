import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface IPaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StationsPagination: React.FC<IPaginationProps> = (props) => {
  const { page, pageSize, totalPages, onPageChange } = props;

  return (
    <Pagination.Root
      page={page}
      count={totalPages * pageSize}
      pageSize={pageSize}
      onPageChange={({ page }) => onPageChange(page)}
      paddingTop={4}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default StationsPagination;
