import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FiPlus } from "react-icons/fi";
import { TextField } from "@mui/material";
import {
  styleLabel,
  priorityValues,
  stylePriority,
  styleAssignees,
} from "../utilities/selectData";
import Select from "react-select";
import { createTask } from "../slice/projectSlice";
import { useDispatch } from "react-redux";

const AddTask = ({ labels, assignees, columnId, projectId }) => {
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

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Display data label and assignees
  const [label, setLabels] = useState([]);
  const [Userassignees, setUserAssignees] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignLabel, setAssignLabel] = useState([]);
  const [assignUser, setAssignUser] = useState([]);
  const [assignPriority, setAssingPriority] = useState([]);

  const submitTask = (e) => {
    e.preventDefault();
    const data = {
      project: projectId,
      column: columnId,
      name,
      description,
      label: assignLabel.map((label) => {
        return label.value;
      }),
      assignees: assignUser.map((assign) => {
        return assign.value;
      }),
      priority: assignPriority.value,
    };

    dispatch(createTask(data));
  };

  useEffect(() => {
    const retrieveLabels = () => {
      if (labels.length > 0) {
        const data = labels.map((label) => {
          return { value: label._id, label: label.name, color: label.color };
        });
        setLabels(data);
      }
    };

    const retrieveAssignees = () => {
      if (assignees.length > 0) {
        const data = assignees.map((assign) => {
          return { value: assign._id, label: assign.email };
        });
        setUserAssignees(data);
      }
    };

    retrieveLabels();
    retrieveAssignees();
  }, [labels, assignees]);
  //Sample data

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        startIcon={<FiPlus />}
        onClick={handleOpen}
      >
        Insert New Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Task
          </Typography>
          <form onSubmit={(e) => submitTask(e)}>
            <TextField
              type="text"
              size="small"
              fullWidth
              label="Task Name"
              sx={{ mt: 2 }}
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              multiline
              rows={6}
              label="Descriptions"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <Select
              isMulti
              placeholder="Select multiple labels..."
              options={label.length > 0 && label}
              onChange={setAssignLabel}
              styles={styleLabel}
            />

            <Select
              isMulti
              placeholder="Select multiple assignees..."
              options={Userassignees.length > 0 && Userassignees}
              onChange={setAssignUser}
              styles={styleAssignees}
            />

            <Select
              defaultValue={[priorityValues[1]]}
              placeholder="Select priority..."
              options={priorityValues.length > 0 && priorityValues}
              onChange={setAssingPriority}
              styles={stylePriority}
            />
            <Button
              type="submit"
              size="small"
              sx={{ float: "right", mt: 1 }}
              variant="contained"
            >
              Save Task
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTask;
