import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FiPenTool, FiTrash2 } from "react-icons/fi";
import { Divider, TextField } from "@mui/material";
import { TwitterPicker } from "react-color";

const Label = ({
  onChangeColor,
  color,
  labelName,
  setLabelName,
  submitLabel,
  labels,
  deleteLabels,
}) => {
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
  const handleClose = () => setOpen(false);

  const [openColor, setOpenColor] = useState(true);

  return (
    <div>
      <Button
        sx={{ mt: 1, mb: 1, mr: 1 }}
        startIcon={<FiPenTool />}
        variant="contained"
        onClick={handleOpen}
      >
        Add Label
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Label
          </Typography>

          <Button
            sx={{ mt: 1 }}
            color={openColor ? "error" : "primary"}
            variant="contained"
            size="small"
            onClick={() => setOpenColor(!openColor)}
          >
            {openColor ? "Close" : "Select Colors"}
          </Button>

          {openColor && (
            <TwitterPicker
              width="400px"
              color={color}
              onChangeComplete={(color) => onChangeColor(color)}
            />
          )}

          <form onSubmit={(e) => submitLabel(e)}>
            <TextField
              required
              type="text"
              size="small"
              fullWidth
              label="Label Name"
              sx={{ mt: 2 }}
              value={labelName}
              name="label"
              onChange={(e) => setLabelName(e.target.value)}
            />
            <Box
              sx={{
                height: 200,
                mt: 3,
                mb: 3,
                border: "1px solid rgba(0,0,0,0.3)",
                p: 1,
                overflowY: "scroll",
              }}
            >
              {labels ? (
                labels.map((label) => (
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: 1,
                      borderBottom: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    <Typography
                      style={{
                        background: label.color,
                        color: "white",
                        marginBottom: 6,
                        borderRadius: 5,
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}
                    >
                      {label.name}
                    </Typography>

                    <div style={{ flex: 1 }}></div>

                    <Button
                      startIcon={<FiTrash2 />}
                      style={{ marginBottom: 6 }}
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => deleteLabels(label._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography>No Label</Typography>
              )}
            </Box>

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

export default Label;
