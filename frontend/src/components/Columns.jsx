import {
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { blue } from "@mui/material/colors";
import { FiMoreVertical, FiPlus } from "react-icons/fi";
import AddTask from "./AddTask";

const Columns = ({ column, index, labels, assignees }) => {
  // Settings Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
              <IconButton size="small" onClick={handleClick}>
                <FiMoreVertical />
              </IconButton>

              {/* Menu Options Settings */}
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    fullWidth
                  >
                    Rename Column
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    fullWidth
                  >
                    Delete Column
                  </Button>
                </MenuItem>
              </Menu>
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
              }}
            >
              <AddTask labels={labels} assignees={assignees} />
            </Box>
          </Box>
        )}
      </Draggable>
    </div>
  );
};

export default Columns;
