import {
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Paper,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { blue } from "@mui/material/colors";
import { FiMoreVertical, FiPlus } from "react-icons/fi";
import AddTask from "./AddTask";

import { useDispatch } from "react-redux";

const Columns = ({ column, index, labels, assignees, projectId }) => {
  const dispatch = useDispatch();

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
        <MenuItem>
          <Button variant="outlined" color="primary" size="small" fullWidth>
            Rename Column
          </Button>
        </MenuItem>
        <MenuItem>
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>
      <Draggable key={column._id} draggableId={`${column._id}`} index={index}>
        {(provided, snapshot) => (
          <Grid
            item
            lg={12}
            md={12}
            sx={{
              // display: "flex",
              // flexDirection: "column",
              // boxShadow: "-1px 2px 10px -2px rgba(0,0,0,0.43);",
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
              <IconButton size="small" onClick={handleClick}>
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
                    {column.task.length > 0 &&
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
                              <Typography variant="body2" fontWeight={"bold"}>
                                {task.name}
                              </Typography>
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
          </Grid>
        )}
      </Draggable>
    </div>
  );
};

export default Columns;
