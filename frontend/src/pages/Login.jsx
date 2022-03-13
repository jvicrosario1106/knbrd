import React from "react";
import LoginBackground from "../images/login.jpg";
import LoginBackgroundTwo from "../images/login2.svg";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

const Login = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3)100%, rgba(0,0,0,0.3)100%), url(${LoginBackground})`,
          backgroundSize: "cover",
        }}
      >
        <Paper sx={{ width: 400, p: 3 }}>
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <img src={LoginBackgroundTwo} width={"50%"} />
          </Box>
          <Typography variant="h4" textAlign={"center"}>
            Welcome to{" "}
            <Typography
              variant="h4"
              fontWeight={"bold"}
              component={"span"}
              color="primary"
            >
              Knbrd
            </Typography>{" "}
          </Typography>

          <Typography sx={{ mt: 3, mb: 1 }} variant="body1">
            Email Address
          </Typography>
          <TextField
            size="small"
            fullWidth
            label="Enter Email"
            InputLabelProps={{}}
          />
          <Typography sx={{ mt: 1, mb: 1 }}>Password</Typography>
          <TextField size="small" fullWidth label="Enter Password" />

          <Button variant="contained" sx={{ mt: 2, float: "right" }}>
            Log In
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
