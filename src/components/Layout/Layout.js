import React from "react";
//without .js bc our build workflow adds file extn
import Aux from "../../hoc/Aux";

//allows us to use layout component as a wrapper for core content we want to render to the screen
const layout = props => (
  <Aux>
    <div>Toolbar, SideDraw, Backdrop</div>
    <main>{props.children}</main>
  </Aux>
);

export default layout;
