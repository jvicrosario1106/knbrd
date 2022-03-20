import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FiEdit3 } from "react-icons/fi";
import { TextField } from "@mui/material";

const RenameProject = ({ projectName, setProjectName, updateProjectNames }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        endIcon={<FiEdit3 />}
        variant="outlined"
        color="primary"
        size="small"
        fullWidth
        onClick={handleOpen}
      >
        Rename Project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Project Name
          </Typography>
          <form onSubmit={(e) => updateProjectNames(e)}>
            <TextField
              type="text"
              size="small"
              fullWidth
              label="Project Name"
              sx={{ mt: 2 }}
              value={projectName}
              name="projectname"
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Button
              type="submit"
              size="small"
              sx={{ float: "right", mt: 1 }}
              variant="contained"
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default RenameProject;
