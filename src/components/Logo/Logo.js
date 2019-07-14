import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img alt="My Burger" src={burgerLogo} />{" "}
    </div>
  );
};

export default Logo;
