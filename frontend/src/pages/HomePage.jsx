import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";
import React from "react";
import AddProject from "../components/AddProject";

import { useDispatch, useSelector } from "react-redux";
import { getProjects, createProject } from "../slice/projectSlice";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const HomePage = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { projects, isLoading } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const submitProject = (e) => {
    e.preventDefault();
    dispatch(createProject({ name }));
  };

  return (
    <div>
      <Typography variant="h4" fontWeight={"bold"}>
        Welcome to Knbrd !
      </Typography>
      <Typography sx={{ opacity: 0.6 }}>
        Manage and organized your projects smoothly
      </Typography>

      <Box sx={{ mt: 1.5, mb: 1.5 }}>
        <AddProject
          name={name}
          setName={setName}
          submitProject={submitProject}
        />
      </Box>

      <Divider />

      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Typography variant="h5" fontWeight={"bold"}>
          Your Projects
        </Typography>

        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}

        <Grid
          container
          spacing={2}
          sx={{ height: 420, mt: 1, overflowY: "scroll" }}
        >
          {projects.length > 0 &&
            projects.map((project) => (
              <Grid
                item
                key={project._id}
                xs={12}
                sm={12}
                md={6}
                lg={4}
                onClick={() => navigate(`project/${project._id}`)}
              >
                <Box
                  sx={{
                    border: "1px solid rgba(0,0,0,0.3)",
                    padding: 6,
                    textAlign: "center",
                    borderRadius: 3,
                    background: theme.palette.primary.light,
                    color: "rgba(0,0,0,0.6)",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography>{project.name}</Typography>

                  <Chip
                    label={moment(project.createdAt).format("YYYY-MM-DD")}
                    color="primary"
                    variant="contained"
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
