import React, { Component } from "react";
//without .js bc our build workflow adds file extn
import Aux from "../Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.css";

//allows us to use layout component as a wrapper for core content we want to render to the screen

//add CSS class to main to make sure it has some margin
class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = props => {
    this.setState({ showSideDrawer: false });
  };

  //if you plan on using state, you should do it this way bc it's async, depends on prevState
  sideDrawerToggleHandler = props => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar toggle={this.sideDrawerToggleHandler} />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
