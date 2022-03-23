import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";

const Task = ({ task, columnId }) => {
  return (
    <div>
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
          {task.name}
        </Typography>
      </Box>
    </div>
  );
};

export default Task;
