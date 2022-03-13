import {
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";
import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* <Box>
        <Typography fontWeight={"bold"} variant="h4">
          Customer Project Management
        </Typography>
        <Box sx={{ mb: 3, mt: 3 }}>
          <IconButton>
            <FiUserPlus />
          </IconButton>
          <Button size="small" variant="contained">
            New Column
          </Button>
        </Box>
        <Divider />
      </Box> */}
      <Typography variant="h4" fontWeight={"bold"}>
        Welcome to Knbrd !
      </Typography>
      <Typography sx={{ opacity: 0.6 }}>
        Manage and organized your projects smoothly
      </Typography>

      <Box sx={{ mt: 1.5, mb: 1.5 }}>
        <Button startIcon={<FiPlus />} variant="contained" size="small">
          New Project
        </Button>
      </Box>

      <Divider />

      <Container maxWidth="md" sx={{ background: "red" }}>
        <Typography>Projects</Typography>
      </Container>
    </div>
  );
};

export default HomePage;
