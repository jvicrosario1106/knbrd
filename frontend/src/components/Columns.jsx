import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Paper,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { blue } from "@mui/material/colors";
import { FiMoreVertical, FiTrash } from "react-icons/fi";
import AddTask from "./AddTask";
import Task from "./Task";

const Columns = ({ column, index, labels, assignees, projectId }) => {
  // Settings Menu
  const [anchorEl, setAnchorEl] = useState(false);
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
              height: "60vh",
              mr: 1,
              p: 2,
              width: "23vw",
              background: snapshot.isDragging && blue[50],
            }}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {/* Menu Options Settings */}
            {/* <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem>
                <Typography>Rename Column </Typography>
              </MenuItem>
              <MenuItem onClick={removeColumn(column._id)}>
                <Typography>Delete Column</Typography>
              </MenuItem>
            </Menu> */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>
                {column.name}{" "}
                <Typography sx={{ opacity: 0.3 }} component={"span"}>
                  {" "}
                  {column.task.length}
                </Typography>
              </Typography>
              <IconButton size="small">
                <FiMoreVertical />
              </IconButton>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Droppable
                droppableId={`${column._id}`}
                key={column._id}
                type="TASK"
              >
                {(provided, snapshot) => (
                  <div
                    style={{ overflowY: "scroll", p: 1, height: "53vh" }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {column.task?.length > 0 &&
                      column.task.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={`${task._id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              sx={{
                                borderLeft: `3px solid  ${blue[500]}`,
                                height: "20vh",
                                p: 1,
                                m: 1,
                                background: snapshot.isDragging && blue[50],
                                boxShadow:
                                  "-1px 2px 10px -2px rgba(0,0,0,0.43);",
                              }}
                            >
                              <Task task={task} columnId={column._id} />
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Box>

            <Box
              sx={{
                width: "100%",
                mt: 1,
              }}
            >
              <AddTask
                columnId={column._id}
                labels={labels}
                assignees={assignees}
                projectId={projectId}
              />
            </Box>
          </Box>
        )}
      </Draggable>
    </div>
  );
};

export default Columns;
