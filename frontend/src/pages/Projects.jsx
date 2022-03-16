import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography, CircularProgress } from "@mui/material";

const Projects = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { projects, isLoading } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    dispatch(getProject(id));
  }, [dispatch]);

  console.log(projects);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Box>
        <Typography variant="h4" fontWeight={"bold"}>
          {projects[0].name} ({projects[0].columns.length})
        </Typography>
      </Box>
      <Divider />
    </div>
  );
};

export default Projects;
