import React, { Component } from "react";
//without .js bc our build workflow adds file extn
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux"
import classes from "./Layout.module.css";
import { PURCHASE_BURGER_SUCCESS } from "../../store/actions/actionTypes";

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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          toggle={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("Layout state", state)
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(Layout);
