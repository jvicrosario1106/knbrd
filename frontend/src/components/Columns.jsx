import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { blue } from "@mui/material/colors";
import { FiTrash2, FiPlus } from "react-icons/fi";

const Columns = ({ column, index }) => {
  return (
    <div>
      <Draggable key={column._id} draggableId={`${column._id}`} index={index}>
        {(provided, snapshot) => (
          <Box
            sx={{
              height: "53vh",
              overflowY: "scroll",
              boxShadow: "-1px 2px 10px -2px rgba(0,0,0,0.43);",
              mr: 3,
              p: 2,
              width: "15vw",
              background: snapshot.isDragging && blue[50],
              position: "relative",
            }}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>{column.name}</Typography>
              <IconButton
                size="small"
                onClick={() => window.confirm("Are you sure?")}
              >
                <FiTrash2 />
              </IconButton>
            </Box>

            <Box sx={{ position: "absolute", bottom: 0 }}>
              <Button startIcon={<FiPlus />}>Add New Task</Button>
            </Box>
          </Box>
        )}
      </Draggable>
    </div>
  );
};

export default Columns;
