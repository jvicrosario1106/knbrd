import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addColumn,
  getProject,
  reorder,
  columnOrder,
} from "../slice/projectSlice";
import { getLabel, createLabel, deleteLabel } from "../slice/labelSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Label from "../components/Label";
import AddColumn from "../components/AddColumn";
import Columns from "../components/Columns";
import { FiEdit3, FiSettings, FiTrash2 } from "react-icons/fi";
import InviteUser from "../components/InviteUser";

const Projects = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Settings Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { projects, isLoading } = useSelector((state) => state.projectReducer);
  const { labels, isLoading: isLoadingLabel } = useSelector(
    (state) => state.labelReducer
  );

  useEffect(() => {
    dispatch(getProject(id));
    dispatch(getLabel(id));
  }, [dispatch, id]);

  // Label Component Variable

  const [color, setColor] = useState("#000");
  const [labelName, setLabelName] = useState("");
  const onChangeColor = (color) => {
    setColor(color.hex);
  };

  const submitLabel = (e) => {
    e.preventDefault();
    dispatch(createLabel({ project: id, name: labelName, color }));
    setColor("");
    setLabelName("");
  };

  const deleteLabels = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      dispatch(deleteLabel(id));
    }
  };

  // Column Component Variable

  const [name, setName] = useState("");

  const submitColumn = (e) => {
    e.preventDefault();
    dispatch(addColumn({ project: id, name }));
  };

  // For Column Drag
  const handleColumnDrag = (result) => {
    const { destination, draggableId, source } = result;
    if (destination === null) return;

    dispatch(reorder(result));
    dispatch(columnOrder({ project: id }));
  };

  if (isLoading) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {projects.length > 0 ? (
        <div>
          <Box>
            <Typography variant="h4" fontWeight={"bold"}>
              {projects[0].name}{" "}
              <IconButton onClick={handleClick}>
                <FiSettings />
              </IconButton>
            </Typography>

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
                  endIcon={<FiEdit3 />}
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                >
                  Rename Project
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  endIcon={<FiTrash2 />}
                  variant="outlined"
                  color="error"
                  size="small"
                  fullWidth
                >
                  Delete Project
                </Button>
              </MenuItem>
            </Menu>

            <Box sx={{ float: "right", display: "flex" }}>
              <Label
                labels={labels}
                onChangeColor={onChangeColor}
                color={color}
                labelName={labelName}
                setLabelName={setLabelName}
                submitLabel={submitLabel}
                deleteLabels={deleteLabels}
              />
              <AddColumn
                name={name}
                setName={setName}
                submitColumn={submitColumn}
              />
            </Box>

            <Typography>
              This project has {projects[0].columns.length} columns and{" "}
              {projects[0].user.length} members
            </Typography>

            {/* Invite User button / function */}
            <Box>
              <InviteUser />
            </Box>

            <Typography
              sx={{ mt: 1, mb: 1, opacity: 0.6 }}
              variant="h5"
              fontWeight={"bold"}
            >
              Task and Columns
            </Typography>

            <Divider />

            <DragDropContext onDragEnd={(result) => handleColumnDrag(result)}>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  overflowX: "scroll",
                  p: 1,
                }}
              >
                {/* Place to Drop the Columns */}
                <Droppable
                  droppableId={`${id}`}
                  direction="horizontal"
                  type="COLUMN"
                >
                  {(provided, snapshot) => (
                    <Box
                      sx={{
                        background:
                          snapshot.isDraggingOver && "rgba(0,0,0,0.01)",
                        display: "flex",
                        width: "50vw",
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {projects[0].columns.length > 0 ? (
                        projects[0].columns.map((column, index) => (
                          <Box key={column._id}>
                            <Columns
                              column={column}
                              index={index}
                              labels={labels}
                              assignees={projects[0].user}
                            />
                          </Box>
                        ))
                      ) : (
                        <Typography>No Available Column</Typography>
                      )}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Box>
            </DragDropContext>
          </Box>
        </div>
      ) : (
        <Typography>No Data yet</Typography>
      )}
    </div>
  );
};

export default Projects;
