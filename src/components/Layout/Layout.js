import React from "react";
//without .js bc our build workflow adds file extn
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";

//allows us to use layout component as a wrapper for core content we want to render to the screen

//add CSS class to main to make sure it has some margin
const layout = props => (
  <Aux>
    <div>Toolbar, SideDraw, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layout;
