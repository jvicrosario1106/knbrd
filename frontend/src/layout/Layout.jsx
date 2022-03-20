import React from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { FcTodoList } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/system";
import { deepPurple } from "@mui/material/colors";

const Layout = ({ children }) => {
  const drawerWidth = 250;
  const location = useLocation();
  const navigate = useNavigate();
  const { palette } = useTheme();

  const users = JSON.parse(localStorage.getItem("user"));

  const paths = [
    {
      name: <Typography fontWeight={"bold"}>My Projects</Typography>,
      path: "/",
      icon: <FcTodoList size={30} />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {users && (
        <Box>
          <AppBar
            position="fixed"
            color="transparent"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              p: 2,
            }}
          >
            <Typography variant="h5">Hello</Typography>
          </AppBar>

          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "flex" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              <Typography sx={{ p: 3 }}>Knbrd</Typography>
              <Divider />
              <List sx={{ ml: 1, mr: 1 }}>
                {paths.map((path) => (
                  <ListItem
                    key={path.path}
                    button
                    onClick={() => navigate(path.path)}
                    sx={
                      location.pathname === path.path
                        ? {
                            background: deepPurple[50],
                            color: palette.primary.main,
                            borderRadius: 3,
                          }
                        : null
                    }
                  >
                    <ListItemIcon>{path.icon}</ListItemIcon>
                    <ListItemText primary={path.name} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>
        </Box>
      )}

      {users ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

export default Layout;
