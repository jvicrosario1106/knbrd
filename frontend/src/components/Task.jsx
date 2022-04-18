import React from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";

const Task = ({ task, columnId }) => {
  return (
    <div style={{width:"100%"}}>
      <Box sx={{ float: "right" }}>
        <IconButton
          size="small"
          onClick={() => window.alert(`${task._id} in ${columnId}`)}
        >
          <FiTrash2 />
        </IconButton>
      </Box>
      <Box>
        <Typography variant="body2" fontWeight={"bold"}>
          {task.name.toString().substring(0,16) + "..."}
        </Typography>
        <Typography variant="body2" sx={{mb:1, mt:2}}>
          {task.description.toString().substring(0,60) + "..."}
        </Typography>
      </Box>

      <Grid container spacing={1}>
              {task.label.length > 0 && task.label.map(l=>(
                <Grid item>
                <Typography sx={{backgroundColor:l.color, color:"white", p:0.3}}  variant="body2" key={l._id}>
                  {l.name}
                </Typography>
                </Grid>
              ))}
        </Grid>
    </div>
  );
};

export default Task;
