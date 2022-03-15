import { useState, useEffect } from "react";
import { Box, Typography, Divider, Container } from "@mui/material";
import React from "react";
import AddProject from "../components/AddProject";

const HomePage = () => {
  const [name, setName] = useState("");

  return (
    <div>
      <Typography variant="h4" fontWeight={"bold"}>
        Welcome to Knbrd !
      </Typography>
      <Typography sx={{ opacity: 0.6 }}>
        Manage and organized your projects smoothly
      </Typography>

      <Box sx={{ mt: 1.5, mb: 1.5 }}>
        <AddProject name={name} setName={setName} />
      </Box>

      <Divider />

      <Container maxWidth="md" sx={{ background: "red" }}>
        <Typography>Projects</Typography>
      </Container>
    </div>
  );
};

export default HomePage;
