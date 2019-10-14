import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //this could be a functional component, but we made it a class for lifecycle hooks

  componentWillUpdate() {
    console.log("OrderSummary will update");
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      ingred => {
        return (
          <li key={ingred}>
            <span style={{ textTransform: "capitalize" }}>{ingred} </span>:{" "}
            {this.props.ingredients[ingred]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCancelled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
