import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./BurgerIngredients.module.css";

class BurgerIngredients extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom} />;
        break;
      case "bread-top":
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;
      case "meat":
        ingredient = <div className={classes.Meat} />;
        break;
      case "cheese":
        ingredient = <div className={classes.Cheese} />;
        break;
      case "bacon":
        ingredient = <div className={classes.Bacon} />;
        break;
      case "salad":
        ingredient = <div className={classes.Salad} />;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
}
//PropType Validation
//if we ever try to pass an ingredient w/o type string we'll get an error
BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredients;
