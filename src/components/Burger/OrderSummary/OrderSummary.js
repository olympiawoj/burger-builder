import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";
const OrderSummary = props => {
  //get ingredients into the right order summary format

  //I get ingredients in object format and want to map it out to list items
  const ingredientSummary = Object.keys(props.ingredients).map(ingred => {
    return (
      <li key={ingred}>
        <span style={{ textTransform: "capitalize" }}>{ingred} </span>:{" "}
        {props.ingredients[ingred]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.cancel} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continue} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
