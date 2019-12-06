import React from "react";
import classes from "./Spinner.module.css";
const Spinner = () => {
  //Loading inbetween is in case CSS isn't displayed, then this will be shown

  return <div className={classes.Loader}>Loading...</div>;
};

export default Spinner;
