import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      {/* pass exact as prop to NavItme*/}
      <NavigationItem exact link="/" >
        BurgerBuilder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/auth">Auth</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
