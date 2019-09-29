import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };
  render() {
    return (
      //if used w React Router, need div
      //checkoutSummary expects to get ingredients as a prop
      //start w/ dummy data and use routing to pass ingredients late
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;
