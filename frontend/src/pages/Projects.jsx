import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../slice/projectSlice";
import { getLabel, createLabel, deleteLabel } from "../slice/labelSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import Label from "../components/Label";
import AddColumn from "../components/AddColumn";

const Projects = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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
              {projects[0].name}
            </Typography>

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
              <AddColumn />
            </Box>
          </Box>
        </div>
      ) : (
        <Typography>No Data yet</Typography>
      )}
    </div>
  );
};

export default Projects;
