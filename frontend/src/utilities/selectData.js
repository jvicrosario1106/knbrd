import chroma from "chroma-js";
import { deepPurple } from "@mui/material/colors";

export const priorityValues = [
  { value: "low", label: "Low", color: "red" },
  { value: "mediumn", label: "Medium", color: "orange" },
  { value: "high", label: "High", color: "green" },
];

export const styleLabel = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    marginTop: 5,
  }),
  option: (styles, { data }) => {
    return { ...styles, color: `${data.color}` };
  },

  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
      color: color.alpha(0.1).css(),
      borderRadius: 5,
    };
  },
  multiValueLabel: (styles, { data }) => {
    const color = chroma(data.color);
    return { ...styles, color: color.alpha(0.6).css(), fontWeight: "bold" };
  },
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      color: "white",
      cursor: "pointer",
      backgroundColor: data.color,
    },
  }),
};

export const styleAssignees = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    marginTop: 10,
  }),
  option: (styles, { data }) => {
    return { ...styles, color: deepPurple[500] };
  },

  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: deepPurple[100],
      color: deepPurple[100],
      borderRadius: 5,
    };
  },
  multiValueLabel: (styles, { data }) => {
    return { ...styles, color: deepPurple[500], fontWeight: "bold" };
  },
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: deepPurple[500],
    ":hover": {
      color: "white",
      cursor: "pointer",
      backgroundColor: deepPurple[500],
    },
  }),
};

export const stylePriority = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    marginTop: 10,
  }),
  option: (styles, { data }) => {
    return { ...styles, color: `${data.color}` };
  },

  singleValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
      color: color.alpha(1.0).css(),
      borderRadius: 5,
      padding: 3,
      fontWeight: "bold",
    };
  },
};
