import React, { useState } from "react";
import LoginBackground from "../images/login.jpg";
import LoginBackgroundTwo from "../images/login2.svg";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slice/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const { isSuccess, isFailed, isLoading } = useSelector(
    (state) => state.authReducer
  );

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const onChangeCredentials = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(credential));
  };

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

          <form onSubmit={(e) => submitLogin(e)}>
            <Typography sx={{ mt: 3, mb: 1 }} variant="body1">
              Email Address
            </Typography>
            <TextField
              type="email"
              size="small"
              name="email"
              fullWidth
              label="Enter Email"
              value={credential.email}
              onChange={(e) => onChangeCredentials(e)}
            />
            <Typography sx={{ mt: 1, mb: 1 }}>Password</Typography>
            <TextField
              type="password"
              size="small"
              fullWidth
              name="password"
              label="Enter Password"
              value={credential.password}
              onChange={(e) => onChangeCredentials(e)}
            />

            <Button
              disabled={isLoading ? true : false}
              type="submit"
              variant="contained"
              sx={{ mt: 2, float: "right" }}
            >
              {isLoading ? "Logging In" : "Log In"}
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
