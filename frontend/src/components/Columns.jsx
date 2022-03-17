import { Box } from "@mui/material";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Columns = () => {
  return (
    <div>
      <Box>
        <DragDropContext
          onDragEnd={(result) => console.log(result)}
        ></DragDropContext>
      </Box>
    </div>
  );
};

export default Columns;
