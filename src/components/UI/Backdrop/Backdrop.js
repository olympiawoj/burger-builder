import React from "react";
import classes from "./Backdrop.module.css";

//if props.show is true, then display a div with the styling for the backdrop, otherwise return null
//returning null in components just means nothing gets rendered
const Backdrop = props => {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;
};

export default Backdrop;
